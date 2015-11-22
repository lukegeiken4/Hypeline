/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get_nugs: function(req,res){
        var origins = req.query.origin.split(",") || null;
        var response = {};
        var keyword = req.query.keyword;
        var until = req.query.end_time || ""; //yyyy-mm-dd
        var user_id = req.query.user_id;
        var run_id = Date.now();

        var run = {
            run_id: run_id,
            media:origins,
            user_id:user_id,
            keyword:keyword
        };

        var p_stack = [];
        for (i=0;i<origins.length;i++){
            var origin = origins[i];
            switch(origin){
                case "twitter":
                    p_stack.push(sails.controllers.twitter.get_raw_nugs(keyword,until,run_id));
                    break;
/*                case "facebook":
                    sails.controllers.facebook.get_raw_nugs(keyword,until,run_id);
                    break;*/
                case "instagram":
                    p_stack.push(sails.controllers.instagram.get_raw_nugs(keyword,until,run_id));
                    break;
                default:
                    response.error = "No module for "+origin;
                    break;
            }

        }

        var messages = [];
        Promise.all(p_stack).then(function(){

            Run.create(run).exec(function createCB(err, created){
                if(err) console.log(err);
                else  console.log('Created run with id of  ' + created.id);
                return;
            });

            return res.json({results:"Success"});
        });

    },

    find_run:function(req,res){
        var run_id = req.query.run_id;

        Hype_nug.find({where:{run_id:run_id}}).exec(function selectCB(err,found){
            if(err) return res.json({error:err});
            else return res.json({data:found});
        })

    }
};

