/**
 * TwitterController
 *
 * @description :: Server-side logic for managing Twitters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require("request");
var OAuth2 = require("oauth").OAuth2;
var search_base = "https://api.twitter.com/1.1/search/tweets.json";

module.exports = {
    pages:0,

    get_raw_nugs: function(keyword,until,run_id){
        var self = this;

        self.getToken(function(e,access_token,refresh_token,results){
            var options = {
                url:search_base+"?q=%23"+keyword+"&until="+until+"&count=100",
                headers:{
                    "Authorization":"Bearer "+access_token
                }
            };

            return new Promise( function( resolve, reject ){
                self.getPages(keyword,run_id,options);
            });
        });
    },

    getPageAsync: function(keyword,run_id,options){
        var self = this;
        return new Promise( function(resolve,reject){
            request.get(options,function(err,response, body){
                if (err){
                    return {error:err};
                }

                var raw_body = JSON.parse(body);
                var raw_data = raw_body.statuses;
                var raw_next = raw_body.search_metadata.next_results;
                var parsed = [];

                self.parseResults(parsed,raw_data,keyword,run_id);

                    if (parsed.length < 1){
                        resolve(null);
                        return;
                    }

                SentiAnal.analPush({data:parsed}, function(result){
                    if(result) {
                        resolve(raw_next);
                    } else {
                        resolve(null);
                    }
                });
            });
        });
    },

    getPages: function(keyword,run_id,options){
        var self = this;
        this.pages++;
        return this.getPageAsync(keyword,run_id,options)
            .then(function(res){
                if (res && self.pages < 10){
                    options.url = search_base + res;
                    self.getPages(keyword,run_id,options);
                }else{
                    return;
                }
            }).catch(function(e){
                console.log(e.stack);
            });
    },

    parseResults: function(parsed,raw,keyword,run_id){
        for (i=0;i<raw.length;i++){
            var obj = {};
            obj.tag = keyword;
            obj.origin = "twitter";
            obj.date_run = new Date().toISOString();
            obj.run_id = run_id;
            obj.sentiment = 0.0;
            obj.date = new Date(Date.parse(raw[i].created_at)).toISOString();
            obj.text = raw[i].text.replace(/\r?\n|\r/g, " ").replace(/\'/g,"");
            obj.related_tags = "";
            obj.keywords = "";
            obj.origin_id = raw[i].id_str;

            parsed.push(obj);
        }

    },

    getOAuth2: function(){
        return new OAuth2(sails.config.globals.twitter_key,
            sails.config.globals.twitter_secret,
            "https://api.twitter.com/",
            null,"oauth2/token",null);
    },

    getToken:function(callback){
        var oauth2 = this.getOAuth2();

        oauth2.getOAuthAccessToken('',{
            'grant_type':'client_credentials'
        },function(e, access_token, refresh_token, results){
            callback(e,access_token,refresh_token,results);
        });
    }
};

