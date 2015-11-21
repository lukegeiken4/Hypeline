/**
 * Hype_nugController
 *
 * @description :: Server-side logic for managing hype_nugs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	testPush: function (req, res) {
		var data = {
			data:[
				{
					text:"Hi There!",run_id:1,date:1239043247
				},
				{
					text:"Yo Yo Yo, I hate you",run_id:1,date:1239043247
				},
			]
		};
		var result = SentiAnal.analPush(data, false);
		if(result) {
			return res.send("Successful sentiment taken");
		} else {
			return res.send("Shit....");
		}	
  	}
};

