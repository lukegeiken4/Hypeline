/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagrams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require("request");
var ig = require("instagram-node").instagram();

module.exports = {
    get_raw_nugs: function(req,res){
        var keyword = req.query.keyword;
        var until = req.query.end_time || ""; //yyyy-mm-dd
        var run_id = Date.now();
        var self = this;

        this.getToken(function(body){
            request.get("https://api.instagram.com/v1/tags/search?q="+keyword+"&access_token="+sails.config.globals.instagram_access,
                function(err,response,body){

                if (err){
                    return res.json({error:err});
                }

                var raw_tags = JSON.parse(body).data;
                var top_tag = raw_tags[0].name;
                var url = "https://api.instagram.com/v1/tags/" + top_tag + "/media/recent?count=100&access_token="+sails.config.globals.instagram_access;

                request.get(url,function(error, res_last, body_last) {
                    if (error){
                        return res.json({error:error});
                    }
                    var raw = JSON.parse(body_last);
                    var parsed = [];

                    self.parseResults(parsed,raw.data,top_tag,run_id);

                    return res.json({data:parsed});

                });
            });
        });
    },

    getToken: function(callback){
        //this is dumb, but so is instagram
        // https://api.instagram.com/oauth/authorize/?client_id=0e2ff05c455f45b3b1b63cd17a9dd3a1&redirect_uri=http://hypeline.herokuapp.com&response_type=code&scope=public_content
        //curl -F 'client_id=0e2ff05c455f45b3b1b63cd17a9dd3a1' -F 'client_secret=bf51bbbc331247d3b9e1c5073759b9eb' -F 'grant_type=authorization_code' -F 'redirect_uri=http://hypeline.herokuapp.com' -F 'code=b0e58ed5e17046f787de5c626e86df7d' https://api.instagram.com/oauth/access_token
        callback(sails.config.globals.instagram_access);
    },

    parseResults: function(parsed,raw,keyword,run_id){
        console.log(raw[0]);
        for (i=0;i<raw.length;i++){
            var obj = {};
            obj.tag = keyword;
            obj.origin = "instagram";
            obj.date_run = run_id;
            obj.run_id = run_id;
            obj.sentiment = 0.0;
            obj.date = Date.parse(raw[i].created_time);
            obj.text = raw[i].caption.text.replace(/\r?\n|\r/g, " ").replace(/\'/g,"");
            obj.related_tags = [];

            parsed.push(obj);
        }

        //callback();
    }
};
