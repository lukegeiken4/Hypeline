/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var when = require('when');

var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {

	findDupes: function(req, res){
  	var destroy = _.bind(this.destroyDupes, this);
  	Hype_nug.native(function(err, col){
    	col.aggregate([
        { $group: {
          _id: { run_id: "$run_id", origin_id: "$origin_id"},
          uniqueIds: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }},
        { $match: {
          count: { $gt: 1 }
        }}
      ],function(err, result){
        if(err){
          res.send(500, err);
        } else {
          var holder = [];
/*
          var ids = _.each(result, function(record){
            _.each(record.uniqueIds, function(id){
              var obj = {_id: ObjectID(id)};
              holder.push(obj);
            });
          });
*/
          //destroy(holder);
          res.json(200, {length: result.length, raw: result});
        }
      });
  	});
	},

	destroyDupes: function(holder){
  	var first = _.first(holder);
  	console.log(first);
  	Hype_nug.find(first).exec(function(err, model){
    	console.log(model);
  	});
	},

	create_dummy_run: function(req, res){
    var run = Run.create({
      run_id: 1,
      user_id: 1,
      one_time: false,
      keyword: "test",
      media: ["twitter"]
    });

    run.then(function(run){
    	res.json(200, {result: run, message: "Run id 1 created"});
    }).catch(function(err){
      res.json(500, {error: err});
    });
	},

	destroy_orphan_nugs: function(req, res){

  	var nugs = Hype_nug.find();
  	var filterNugs = _.bind(this.filter_run_id, this);
  	var mapNugs = _.bind(this.map_nug_id, this);
  	var destroyNugs = _.bind(this.destroy_nugs, this);

  	nugs.then(function(nugs){

      var filtered = _.filter(nugs, filterNugs);
      var ids = _.map(filtered, mapNugs);
/*
      var handle = destroyNugs(ids);

      handle.then(function(destroyed){
        res.json(200, destroyed);
      }).catch(function(err){
        res.json(500, {error: err})
      });
*/

      res.json(200, filtered);


  	}).catch(function(err){
    	res.json(500, {error: err});
  	});
	},

	filter_run_id: function(result){
  	return _.isEmpty(result.run_id);
	},

	map_nug_id: function(result){
  	return result.id;
	},

	run_test: function(req, res){

  	if(req.body && req.body.run_id){
    	var run = Run.find({run_id: req.body.run_id});
  	} else {
    	var run = Run.find();
  	}

  	var findNugs = _.bind(this.find_run_nugs, this);

  	run.then(function(run){
    	if(_.isEmpty(run)){
        res.json(200, {result: [], message: 'No run found'});
    	} else {

      	var find = findNugs(_.first(run));

      	find.then(function(nugs){
        	console.log(nugs);
          res.json(200, {run: _.first(run), nugs: nugs});
      	}).catch(function(err){
        	console.log(err);
          res.json(500, {error: err});
      	});

    	}

  	}).catch(function(err){
    	console.log(err);
    	res.json(500, {error: err});
  	});

	},

	find_nug_by_id: function(req, res){

  	if(!req.body.keyword){
    	res.json(500, {error: "No keyword"});
  	} else {

    	console.log(req.body.keyword);

    	var results = Hype_nug.find({tag: req.body.keyword});

    	results.then(function(models){
        res.json(200, {result: models});
    	}).catch(function(err){
        res.json(500, {error: err});
    	});
  	}

	},

  get_all_runs: function(req, res){
    var run = Run.find();

    run.then(function(runs){
      res.send(runs);
    }).catch(function(err){
      res.json(500, {error: err});
    });
  },

	destroy_nugs: function(nugs){
  	var destroy = Hype_nug.destroy(nugs);
  	return destroy;
	},

	destroy_test_run: function(req, res){
  	run = Run.destroy({run_id: 123});

  	run.then(function(run){
    	res.json(200, {run: run});
  	}).catch(function(err){
    	res.json(500, {error: err});
  	});
	},

	make_complete: function(req, res){

  	var nugs = [
    	{origin_id: 'test', text: 'test', tag: 'test_tag', origin: 'test', sentiment: 0, run_id: 123},
    	{origin_id: 'test', text: 'test', tag: 'test_tag', origin: 'test', sentiment: 0, run_id: 123},
    	{origin_id: 'test', text: 'test', tag: 'test_tag', origin: 'test', sentiment: 0, run_id: 123},
  	];

  	var run = {
    	run_id: 123,
      user_id: 1,
      keyword: "test_tag"
  	};

  	var createRun = Run.create(run);
  	var nugs = Hype_nug.create(nugs);

  	Promise.all([createRun, nugs]).then(function(result){
    	res.json(200, {result: result});
  	}).catch(function(err){
    	res.json(500, {error: err});
  	});


	},

	find_run_nugs: function(run){
    var nugs = Hype_nug.find({run_id: String(run.run_id)});
    return nugs;
	},

	remove_run_and_nugs: function(req, res){

  	if(!req.body.run_id){
    	console.error("ERROR DELETING RUN - No run id");
    	res.json(500, {error: "No run id"});
  	} else {

    	var run = Run.findOne({run_id: req.body.run_id});
    	var findNugs = _.bind(this.find_run_nugs, this);
      var findNugIds = _.bind(this.map_nug_id, this);
      var destroyNugs = _.bind(this.destroy_nugs, this);

    	run.then(function(run){

      	var nugs = findNugs(run);

      	if(_.isEmpty(run)){
          res.json(200, {result: run, message: "No run found"});
      	} else {

          nugs.then(function(nugs){

            var ids = _.map(nugs, findNugIds);
            var nugsDestroyed = destroyNugs(ids);
            var destroyRun = run.destroy();

            Promise.all([destroyRun, nugsDestroyed])
            .then(function(data){
              res.json(200, {result: data});
            })
            .catch(function(err){
              res.json(500, {error: err});
            });


          }).catch(function(err){
            console.log("ERROR FETCHING NUGS [REMOVE RUN]");
            res.json(500, {error: err});
          });

        }

    	}).catch(function(err){
      	console.log("ERROR FETCHING RUN [REMOVE RUN]");
        res.json(500, {error: err});
    	});

  	}
	}
};

