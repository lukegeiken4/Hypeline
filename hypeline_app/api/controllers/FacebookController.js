/**
 * FacebookController
 *
 * @description :: Server-side logic for managing Facebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var OAuth2 = require("oauth").OAuth2;
var request = require("request")

var graph_base = "https://graph.facebook.com/";

module.exports = {
    get_raw_nugs: function(req,res){
        var keyword = req.query.keyword;
        var until = req.query.end_time || ""; //yyyy-mm-dd
        var run_id = Date.now();
        var self = this;

        this.getToken(function(access_token){
            var options = {
                url:graph_base+"search?q="+keyword+"&type=post",

            }
            request.get()
        });
    },

    getOAuth2: function(){
        return new OAuth2(sails.config.globals.facebook_key,
            sails.config.globals.facebook_secret,
            "http://graph.facebook.com/",
            null,"oauth/access_token",null);
    },

    getToken:function(callback){
        var oauth2 = this.getOAuth2();

        console.log(sails.config.globals.facebook_key,
            sails.config.globals.facebook_secret);

        var options = {
            url:graph_base+"oauth/access_token?client_id="
                +sails.config.globals.facebook_key
                +"&client_secret="+sails.config.globals.facebook_secret
                +"&grant_type=client_credentials"
        };

        request.get(options,function(err,response,body){
            var raw = body.replace("access_token=","");

            callback(raw);
        });
    }
};

