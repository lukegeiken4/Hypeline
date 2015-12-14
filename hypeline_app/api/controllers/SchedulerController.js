/**
 * SchedulerController
 *
 * @description :: Server-side logic for managing schedulers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	schedule_run: function(req, res){

    var validation = [
      {field: "user_id", message: "User not found"},
      {field: "run_id", message: "Run not found"},
      {field: "frequency", message: "Frequency not specified"}
    ];
  	var errors = ErrorHandler.error_handler(validation, req.body);

    if(errors.length > 0){
      res.json(500, {error: errors});
    } else {

    	Scheduler.find({run_id: req.body.run_id}).exec(function(err, run){
      	if(err){
        	res.send(500, {error: err})
      	} else {
        	if(run.length > 0){
          	res.send(200, {message: 'we have a scheduled run already'});
        	} else {
          	console.log("Creating new schedule");
          	Scheduler.create({
            	user_id: req.body.user_id,
            	run_id: req.body.run_id,
            	frequency: req.body.frequency,
            	last_ran: null,
            	active: req.body.active || true
          	}).exec(function(err, run){
            	if(err){
              	res.json(500, {error: err});
            	} else {
              	res.json(200, {result: run});
            	}
          	});
        	}
      	}
    	});

  	}
	},

	get_user_scheduled_runs: function(req, res){

  	if(!req.body.user_id){
    	res.json(500, {error: "User not found"});
  	} else {

    	Scheduler.find({user_id: req.body.user_id}).exec(function(err, runs){
      	if(err){
        	res.json(500, {error: error});
      	} else {
          res.json(200, {results: runs});
      	}
    	});

  	}
	},

	test_queue: function(req, res){
  	var message = JSON.stringify({
    	message: "test message",
    	id: 123
  	});
  	var cb = function(){
    	res.json(200, {message: "queued message"});
  	};
  	Queueing.queue_message('scheduled', message, cb);
	}

};

