/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get_nugs: function(req,res){
        var origin = req.params.origin || null;
        var response = {};

        switch(origin){
            case "twitter":
                sails.controllers.twitter.get_raw_nugs(req,res);
                break;
            case "facebook":
                sails.controllers.facebook.get_raw_nugs(req,res);
                break;
            default:
                response.error = "No module for "+origin;
                break;
        }
    }
};

