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

	process_scheduled_run: function(req, res){

  	if(!req.body.messageJson){
    	console.error('ERROR [PROCESSING SCHEDULED RUN] : Message not recieved');
    	res.send(500, {error: "Message not receibed"});
  	}

  	var json = req.body.parse(messageJson);

    var validation = [
      {field: "user_id", message: "User not found"},
      {field: "run_id", message: "Run not found"},
      {field: "frequency", message: "Frequency not specified"}
    ];
  	var errors = ErrorHandler.error_handler(validation, json);

    if(errors.length > 0){
      res.json(500, {error: errors});
    } else {

    	var run = Run.find({run_id: json.run_id});

    	run.then(function(run){
        sails.controllers.analyze.processed_received(run);
    	}).catch(function(err){
      	console.log('ERROR [PROCESSING SCHEDULED RUN] : %s', err);
      	res.json(500, {error: err});
    	});

  	}
	},


	test_queue: function(req, res){

  	Run.find({where: {user_id: req.body.user_id}}).exec(function(err, runs){
    	if(err){
      	console.log(err);
    	} else {
      	console.log(runs);

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
      	res.json(200, {reesult: "message queued", message: message});

    	}
  	});


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
              console.log("Destroyed run [%s] and [%s] nugs", data[0].run_id, data[1].length);
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
	},

	find_run_nugs: function(run){
    var nugs = Hype_nug.find({run_id: String(run.run_id)});
    return nugs;
	},

	destroy_nugs: function(nugs){
  	var destroy = Hype_nug.destroy(nugs);
  	return destroy;
	},

	map_nug_id: function(result){
  	return result.id;
	},

	get_all_runs: function(req, res){
  	//@TODO make sure this is admin only
  	var run = Run.find();

  	run.then(function(runs){
    	res.json(200, {result: runs});
  	}).catch(function(err){
    	res.json(500, {error: err});
  	});
	}

};

