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
    get_raw_nug: function(){

    },

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
                request.get(options,function(err,response, body){
                    if (err){
                        return {error:err};
                    }

                    var raw_body = JSON.parse(body);
                    var raw_data = raw_body.statuses;
                    var raw_next = raw_body.next_results;

                    var parsed = [];

                    self.parseResults(parsed,raw_data,keyword,run_id);

                    SentiAnal.analPush({data:parsed}, null, function(result){
                        resolve();
                        if(result) {
                            return {data:"Successful sentiment taken"};
                        } else {
                            return {error:"Shit...."};
                        }
                    });
                });
            });
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
            obj.text = raw[i].text.replace(/\r?\n|\r/g, " ").replace(/\uE000-\uF8FF\'/g,"");
            obj.related_tags = [];
            obj.origin_id = raw[i].id_str;

            parsed.push(obj);
        }

        //callback();
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

