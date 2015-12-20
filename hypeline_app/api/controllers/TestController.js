/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {
	createModels: function(req, res){
  	var models = [
    	{model_id: 1, run_id: "test1"},
    	{model_id: 2, run_id: "test1"},
    	{model_id: 1, run_id: "test2"},
    	{model_id: 3, run_id: "test3"},
    	{model_id: 3, run_id: "test3"},
    	{model_id: 4, run_id: "test3"},
  	];


  	Test.create(models, function(err, models){
    	if(err){
      	res.send(500, err);
    	} else {
      	res.json(200, models);
    	}
  	});
	},

	checkModels: function(req, res){
    Test.find().exec(function(err, models){
     	if(err){
      	res.send(500, err);
    	} else {
      	res.json(200, models);
    	}
    });
	},

	destroyModels: function(req, res){
    Test.destroy().exec(function(err, models){
     	if(err){
      	res.send(500, err);
    	} else {
      	res.json(200, models);
    	}
    });
	},

	findRuns: function(req, res){
  	Run.find().exec(function(err, runs){
    	res.json(200, runs);
  	});
	},

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
          res.json(200, {lenght: result.length, raw: result});
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
	}
};

