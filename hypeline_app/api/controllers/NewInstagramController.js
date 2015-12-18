/**
 * InstagramController
 *
 * @description :: Server-side logic for managing Instagram posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');
var request = require("request");
var when = require("when");
var instgramToken = sails.config.globals.instagram_access;
var search_base = "https://api.instagram.com/v1/tags/";
var parsedResults = [];
var topTag = "";

module.exports = {
    pages:0,

    testRun: function(req, res){
      var test = this.entrypoint("test", new Date().getTime(), 10, 1);
      test.then(function(results){
        res.json(200, {results: results});
      });
    },

    get_data: function(keyword, until, run_id){
      var results = this.entrypoint(keyword, new Date().getTime(), 100, run_id);
      return results;
    },

    entrypoint: function(keyword, until, count, run_id){

      var constructUrl = _.bind(this.construct_url, this);
      var getPages = _.bind(this.get_all_pages, this);
      var getResults = _.bind(this.get_results_page, this);
      var getTopTag = _.bind(this.get_top_tag);

      var promise = new Promise(function(resolve, reject){

        var options = {
          keyword: keyword,
          until: until,
          count: count,
          run_id: run_id
        };

        var tagsUrl = constructUrl(options, "initial");
        var tags = getTopTag(tagsUrl);

        tags.then(function(tag){
          topTag = tag;
        }).catch(function(err){
          console.log('ERROR [INSTAGRAM] : %s', err);
        });

        when(tags).then(function(){
          var request = constructUrl(options, "fetch");
          var pages = getPages(request, options)
          .then(function(results){
            resolve(parsedResults);
          }).catch(function(error){
            console.log('ERROR [INSTAGRAM] : %s', error);
            reject(error);
          });
        });

      });

      return promise;
    },

    get_top_tag: function(url){

      return new Promise(function(resolve, reject){

        var tag_cb = function(err, response, body){
          if (err){
              console.log('ERROR [INSTAGRAM] in get_top_tag : %s', err);
          } else {
            var raw = JSON.parse(body);
            var tags = raw.data;

            if (tags.length < 1){
              reject("No tags found");
            } else {
              var topTag = tags[0].name;
              resolve(topTag);
            }
          }
        }

        request.get(url, tag_cb);

      });
    },

    construct_url: function(options, type){

      var request = {};

      if(type === "initial"){
        request.url = search_base + "search/?count=" + options.count + "&q=" + options.keyword + "&access_token=" + instgramToken;
      } else {
        request.url = search_base + topTag + "/media/recent?count=" + options.count + "&access_token=" + instgramToken + "&min_tag_id=";
      }

      return request;

    },

    get_pages: function(request, runData){
      var getAllPages = _.bind(this.get_all_pages, this);

      return new Promise( function( resolve, reject ){
        getAllPages(request, runData);
      });
    },

    get_all_pages: function(request, runData){

      var getResults = _.bind(this.get_results_page, this);
      var getAllPages = _.bind(this.get_all_pages, this);
      var getUrl = _.bind(this.construct_url, this);

      var page = getResults(request, runData);
      var pageCount = 0;
      var getMorePages = function(res){
        pageCount++;
        if(res && pageCount < 10){
          request.url = res;
          return getResults(request, runData);
        } else {
          return;
        }
      };
      var errFunction = function(error){
        console.log('ERROR [TWITTER] in get_all_pages : %s', error.stack);
        reject(error);
      }

     return page
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .then(getMorePages)
            .catch(errFunction);

    },

    get_results_page: function(options, runData){

      var filterResults = _.bind(this.filter_results, this);
      var parseResults = _.bind(this.parse_data, this, runData.keyword, runData.run_id);

      var resultsBatch = new Promise(function(resolve, reject){

        request.get(options,function(err, response, body){
          if(err){
            console.log('ERROR [INSTAGRAM] in get_results_page : %s', err);
          } else {
            var raw = JSON.parse(body);
            var data = raw.data;
            var next = raw.pagination.next_url;

            var parsed = _.chain(data)
                     .filter(filterResults)
                     .map(parseResults)
                     .value();

            parsedResults = parsedResults.concat(parsed);

            resolve(next);
          }
        });

      });

      return resultsBatch;
    },

    parse_data: function(keyword, runId, result){
      var obj = {};
      obj.tag = keyword;
      obj.origin = "instagram";
      obj.date_run = new Date().toISOString();
      obj.run_id = runId;
      obj.sentiment = 0.0;
      obj.date =  new Date(parseInt(result.caption.created_time)*1000).toISOString();
      obj.text = result.caption.text.replace(/\r?\n|\r/g, " ").replace(/\'/g,"");
      obj.related_tags = "";
      obj.keywords = "";
      obj.origin_id = result.id;

      return obj;
    },

    filter_results: function(result){
      return true;
    }
};

