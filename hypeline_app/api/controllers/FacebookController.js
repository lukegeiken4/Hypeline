/**
 * FacebookController
 *
 * @description :: Server-side logic for managing Facebooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get_raw_nugs: function(req,res){
        var keyword = req.query.keyword;
        var until = req.query.end_time || ""; //yyyy-mm-dd
        var run_id = Date.now();
        var self = this;


    }
};

