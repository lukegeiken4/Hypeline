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
	}
};

