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
        var start_date = "";

        if (req.query.start_date){
            start_date = new Date(req.query.start_date).toISOString();
        }

        var end_date = "";
        if (req.query.end_date){
            end_date = new Date(req.query.end_date).toISOString();
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
                    p_stack.push(sails.controllers.twitter.get_raw_nugs(keyword,until,run_id));
                    break;
/*                case "facebook":
                    sails.controllers.facebook.get_raw_nugs(keyword,until,run_id);
                    break;*/
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

    },

    find_run:function(req,res){
        var run_id = req.query.run_id;

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
        })

    }
};

