/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get_nugs: function(req,res){

        var errors = [];

        if(!req.body.origin){
          errors.push("You must specify at least one platform to search.");
        }

        if(!req.body.keyword){
          errors.push("You must specify a keyword");
        }

        if(req.body.keyword && req.body.keyword.indexOf('#') > -1){
          errors.push("Keyword should not include a hash");
        }

        if(req.body.keyword && req.body.keyword.indexOf(' ') > -1){
          errors.push("Keyword cannot contain any spaces");
        }

        if(req.body.keyword && errors.length > 0){
          res.send(500, {errors: errors});
        } else {

          var origins = req.body.origin.split(",") || null;
          var response = {};
          var keyword = req.body.keyword;
          var until = req.body.end_time || ""; //yyyy-mm-dd
          var user_id = req.body.user_id;
          var run_id = Date.now();
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
  /*
              switch(origin){
                  case "twitter":
                      p_stack.push(sails.controllers.twitter.get_raw_nugs(keyword,until,run_id));
                      break;
                  case "instagram":
                      p_stack.push(sails.controllers.instagram.get_raw_nugs(keyword,until,run_id));
                      break;
                  case "vine":
                      p_stack.push(sails.controllers.vine.get_raw_nugs(keyword,until,run_id));
                      break;
                  case "gplus":
                      p_stack.push(sails.controllers.gplus.get_raw_nugs(keyword,until,run_id));
                      break;
                  case "tumblr":
                      p_stack.push(sails.controllers.tumblr.get_raw_nugs(keyword,until,run_id));
                      break;
                  default:
                      response.error = "No module for "+origin;
                      break;
              }
  */

          }

          var messages = [];

          Promise.all(p_stack).then(function(){

              Run.create(run).exec(function createCB(err, created){
                  if(err) {
                      console.log(err);
                  }else{
                      console.log('Created run with id of  ' + created.id);
                  }

                  return;
              });

              return res.json({data:run});
          });

          if (p_stack.length < 1){
              return res.json({data:"Unavailable"});
          }

        }

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

