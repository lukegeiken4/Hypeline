/**
 * RunController
 *
 * @description :: Server-side logic for managing runs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_user_runs: function(req, res){
    Run.find({where: {user_id: req.body.user_id}}).exec(function(err, runs){
      if(err){
        console.log(err);
        res.send(503, {error: err});
      } else {
        res.send(200, runs);
      }
    })
	},

	test_queue: function(req, res){

  	Run.find({where: {user_id: req.body.user_id}}).exec(function(err, runs){
    	if(err){
      	console.log(err);
    	} else {
      	console.log(runs);
      	res.json(200, runs);
/*
  	  	var message = JSON.stringify({
        	message: "test message",
        	id: 123
      	});
      	var cb = function(){
        	res.json(200, {message: "queued message"});
      	};
      	Queueing.queue_message('scheduled', message, cb);
*/

    	}
  	});


	}
};

