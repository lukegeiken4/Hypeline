/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var when = require('when');
 var uuid = require('uuid');

module.exports = {
    get_nugs: function(req,res){

        var runStamp = new Date();
        console.log(" --- Starting Run at %s ---", runStamp);

        var errors = [];

        if(req.body.media){
          req.body.origin = req.body.media.join(',');
        }

        if(!req.body.origin){
          errors.push("You must specify at least one platform to search.");
          console.error("No origin present [%s]", runStamp);
        }

        if(req.body.demo && !req.body.test_run){
          res.send(500, {error: "Search not allowed in demo"});
          console.error("Trying to search in demo [%s]", runStamp);
        }

        if(!req.body.keyword){
          errors.push("You must specify a keyword");
          console.error("No keyword present [%s]", runStamp);
        }

        if(req.body.keyword && req.body.keyword.indexOf('#') > -1){
          errors.push("Keyword should not include a hash");
          console.error("Keyword includes hash [%s]", runStamp);
        }

        if(req.body.keyword && req.body.keyword.indexOf(' ') > -1){
          errors.push("Keyword cannot contain any spaces");
          console.error("Keyword contains whitespace [%s]", runStamp);
        }

        if(errors.length > 0){
          res.send(500, {errors: errors});
          return;
        } else {

          var run_id;
          var existing_run = false;

          if(req.body.run_id){
            run_id = req.body.run_id;
            existing_run = true;
            console.log("Existing run - %s - [%s]", run_id, runStamp);
          } else {
            run_id = uuid.v1({
              node: [0x10, 0x23, 0x45, 0x67, 0x89, 0xab],
              clockseq: 0x1234,
              msecs: new Date().getTime(),
              nsecs: 5678
            });
            console.log("New run initialized - %s - [%s]", run_id, runStamp);
          }

          var origins = req.body.origin.split(",") || null;
          var response = {};
          var keyword = req.body.keyword;
          var until = req.body.end_time || ""; //yyyy-mm-dd
          var user_id = req.body.user_id;
          var analyzeRun = _.bind(this.analyze_run, this);
          var filterRun = _.bind(this.filter_run, this);

          var start_date = "";

          if (req.body.start_date){
              start_date = new Date(req.body.start_date).toISOString();
          }

          var end_date = "";
          if (req.body.end_date){
              end_date = new Date(req.body.end_date).toISOString();
          }

          var run = {
              run_id: run_id,
              media:origins,
              user_id:user_id,
              keyword:keyword,
              start_date:start_date,
              end_date:end_date
          };

          var p_stack = [];
          for (i=0;i<origins.length;i++){
              var origin = origins[i];
                switch(origin){
                  case "twitter":
                      var twitter = sails.controllers.newtwitter.get_data(keyword,until,run_id);
                      p_stack.push(twitter);
                      break;
                  case "instagram":
                      var instagram = sails.controllers.newinstagram.get_data(keyword,until,run_id);
                      p_stack.push(instagram);
                      break;
                  case "vine":
                      var vine = sails.controllers.newvine.get_data(keyword, until, run_id);
                      p_stack.push(vine);
                      break;
                  case "gplus":
                      var gplus = sails.controllers.newgplus.get_data(keyword,until,run_id);
                      p_stack.push(gplus);
                      break;
                  case "tumblr":
                      var tumblr = sails.controllers.newtumblr.get_data(keyword, until, run_id);
                      p_stack.push(tumblr);
                      break;
                  default:
                      response.error = "No module for " + origin;
                      break;
              }
          }

          var messages = [];

          Promise.all(p_stack).then(function(data){

              console.log("%s total results fetched - [%s]", _.flatten(data).length, runStamp);

              var filtered = filterRun(_.flatten(data));

              filtered.then(function(filteredResults){

                //console.log(" --- RESULTS ---", filteredResults);

                var dataPoints = analyzeRun(filteredResults);
                var returnResults = function(models){

                  var run;
                  var cbFunc;
                  var errFunc;

                  if(!existing_run){
                    run = Run.create(run);
                    cbFunc = function(run){
                      console.log("New run created - %s - [%s]", run.run_id, runStamp);
                      console.log(' --- Run Complete [%s] ---', runStamp);
                      return res.json({run_data:run, nugs: _.flatten(models)});
                    };

                    errFunc = function(err){
                      console.error('ERROR [ANALYZER] : %s', err);
                      console.error('1', err);
                      res.json(500, {error: err});
                    }

                  } else {
                    run = Run.find({run_id: run_id});
                    cbFunc = function(run){
                      console.log("Run updated - %s - [%s]", run.run_id, runStamp);
                      console.log(' --- Run Complete [%s] ---', runStamp);
                      Hype_nug.find({run_id: run.run_id}).exec(function(err, nugs){
                        if(err){
                          res.json(500, {error: err});
                        } else {
                          return res.json({run_data:run, nugs: nugs});
                        }
                      });
                    };

                    errFunc = function(err){
                      console.error('ERROR [ANALYZER] : %s', err);
                      console.error('2', err);
                      res.json(500, {error: err});
                    }
                  }

                  run
                  .then(cbFunc)
                  .catch(errFunc);

                };

                console.log("%s unique results fetched - [%s]", filteredResults.length, runStamp);
                dataPoints.then(returnResults);
              }).catch(function(err){
                console.error('Error filtering runs - %s', err);
              });

          });

          if (p_stack.length < 1){
              return res.json({data:"Unavailable"});
          }

        }

    },

    analyze_run: function(data){
      var analyze = SentiAnal.analPush({data:_.flatten(data)});
      return analyze;
    },

    filter_run: function(data){

      var ids = this.get_unique_ids();
      var filterResults = _.bind(this.filter_data_points, this);
      var filteredResults = new Promise(function(resolve, reject){

        ids.then(function(ids){
            var findById = _.partial(filterResults, ids);
            var filtered = _.filter(data, findById);
            resolve(filtered);
        })
        .catch(function(err){
          console.error('Error filtering run %s', err);
          reject(err);
        });

      });

    return filteredResults;

    },

    filter_data_points: function(ids, nug){
      var unique_key = nug.run_id + "-" + nug.origin_id;
      return !_.contains(ids, unique_key);
    },

    get_unique_ids: function(){
      var promise = new Promise(function(resolve, reject){

        Hype_nug.native(function(err, collection){
          collection.distinct("unique_key", function(err, models){
            if(err){
              reject(err);
            } else {
              resolve(models);
            }
          });
        });

      });

      return promise;
    },

    find_run:function(req,res){

        var run_id = req.body.run_id;

        Hype_nug.find({where:{run_id:run_id}}).exec(function selectCB(err,found){
            if(err) return res.json({error:err});

            var keywords = {};

            for (var i=0;i<found.length;i++){
                var current = found[i];
                var keys = current.keywords;

                for (id in keys){
                    if (keywords[id]){
                        keywords[id] += keys[id];
                    }else{
                        keywords[id] = keys[id];
                    }
                }
            }

            var sortedWords = Object.keys(keywords).sort(function(a,b){return keywords[b]-keywords[a]});
            var top_keywords = [];

            for (var i=0;i<5;i++){
                var id = sortedWords[i];
                var obj = {keyword:id,score:keywords[id]};
                top_keywords.push(obj);
            }

            return res.json({data:{nugs:found,keywords:top_keywords}});
        });
    },

    delete_run: function(req,res){

        var run_id = req.body.run_id;

        console.log(run_id);

        Hype_nug.destroy({where:{run_id:run_id}}).exec(function selectCB(err){
            if (err){
                return res.json({error:err});
            }

            Run.destroy({run_id:run_id}).exec(function runCB(error){
                if (error){
                    return res.json({error:error});
                }

                return res.json({data:"Successfully removed "+run_id});
            });

        });
    }
};

