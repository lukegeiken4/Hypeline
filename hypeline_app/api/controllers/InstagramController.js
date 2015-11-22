/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagrams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require("request");
var ig = require("instagram-node").instagram();

module.exports = {
    pages:0,

    get_raw_nugs: function(keyword,until,run_id){
        var self = this;

        return new Promise( function( resolve, reject ){
            self.getPages(keyword,run_id,"");
            resolve();
        });
    },

    getPageAsync: function(keyword,run_id,min_id){
        var self = this;
        return new Promise( function(resolve,reject){
            var tag_url = "https://api.instagram.com/v1/tags/search?q="+keyword+"&access_token="+sails.config.globals.instagram_access;

            request.get(tag_url,function(err,response,body){

                if (err){
                    return {error:err};
                }

                var raw_tags = JSON.parse(body).data;

                if (raw_tags.length < 1){
                    resolve(null);
                    return;
                }

                var top_tag = raw_tags[0].name;

                var url = "https://api.instagram.com/v1/tags/" + top_tag + "/media/recent?min_tag_id="+min_id+"&count=100&access_token="+sails.config.globals.instagram_access;

                request.get(url,function(error, res_last, body_last) {
                    if (error){
                        return {error:error};
                    }

                    var raw = JSON.parse(body_last);

                    var parsed = [];

                    self.parseResults(parsed,raw.data,keyword,run_id);

                    if (parsed.length < 1){
                        resolve(null);
                        return;
                    }

                    SentiAnal.analPush({data:parsed}, function(result){
                        if(result) {
                            resolve(raw.pagination.next_min_id);
                        } else {
                            resolve(null);
                        }
                    });
                });
            });
        });
    },

    getPages: function(keyword,run_id,min_id){
        var self = this;
        this.pages++;
        return this.getPageAsync(keyword,run_id,min_id)
            .then(function(res){

                if (res && self.pages < 10){

                    self.getPages(keyword,run_id,res);
                }

            }).catch(function(e){
                console.log(e.stack);
            });
    },

    getToken: function(callback){
        //this is dumb, but so is instagram
        // https://api.instagram.com/oauth/authorize/?client_id=0e2ff05c455f45b3b1b63cd17a9dd3a1&redirect_uri=http://hypeline.herokuapp.com&response_type=code&scope=public_content
        //curl -F 'client_id=0e2ff05c455f45b3b1b63cd17a9dd3a1' -F 'client_secret=bf51bbbc331247d3b9e1c5073759b9eb' -F 'grant_type=authorization_code' -F 'redirect_uri=http://hypeline.herokuapp.com' -F 'code=b0e58ed5e17046f787de5c626e86df7d' https://api.instagram.com/oauth/access_token
       // / callback(sails.config.globals.instagram_access);
    },

    parseResults: function(parsed,raw,keyword,run_id){
        for (i=0;i<raw.length;i++){
            var obj = {};
            obj.tag = keyword;
            obj.origin = "instagram";
            obj.date_run = new Date().toISOString();
            obj.run_id = run_id;
            obj.sentiment = 0.0;
            obj.date =  new Date(parseInt(raw[i].caption.created_time)*1000).toISOString();
            obj.text = raw[i].caption.text.replace(/\r?\n|\r/g, " ").replace(/\'/g,"");
            obj.related_tags = "";
            obj.keywords = "";
            obj.origin_id = raw[i].id;

            parsed.push(obj);
        }

        //callback();
    }
};

