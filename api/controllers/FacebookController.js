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
                url:graph_base+"v1.0/search?q="+keyword+"&type=post&access_token="+access_token
            }
            request.get(options,function(err,response,body){
                var raw_body = JSON.parse(body);
                return res.json({data:"Nope"});
            });
        });
    },

    getToken:function(callback){
        callback(sails.config.globals.facebook_key+"|"+sails.config.globals.facebook_secret);
    }
};

