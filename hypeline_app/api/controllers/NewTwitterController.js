/**
 * TwitterController
 *
 * @description :: Server-side logic for managing Twitters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');
var OAuthPromise = Promise.promisifyAll(require("oauth").OAuth2);
var request = require("request");
var OAuth2 = require("oauth").OAuth2;
var search_base = "https://api.twitter.com/1.1/search/tweets.json";
var parsedResults = [];
var pagePromises = [];

module.exports = {
    pages:0,

    testTwitter: function(req, res){
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
      var getOAuthToken = _.bind(this.getToken, this);

      var promise = new Promise(function(resolve, reject){

        var options = {
          keyword: keyword,
          until: until,
          count: count,
          run_id: run_id
        };

        var getToken = getOAuthToken()
        .then(function(data){

          var request = constructUrl(data, options);
          var pages = getPages(request, options);

          return pages;

        }).then(function(results){
          resolve(parsedResults);
        }).catch(function(error){
          console.log('ERROR [TWITTER] : %s', error);
          reject(error);
        });

      });

      return promise;
    },

    construct_url: function(oauth, options){

      var request = {
          url: search_base + "?q=%23" + options.keyword + "&result_type=recent&count=" + options.count,
          headers:{
              "Authorization":"Bearer " + oauth.accessToken
          }
      };

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

      var page = getResults(request, runData);
      var pageCount = 0;
      var getMorePages = function(res){
        pageCount++;
        if(res && pageCount < 10){
          request.url = search_base + res;
          return getResults(request, runData);
        } else {
          return;
        }
      };
      var errFunction = function(error){
        console.log('ERROR [TWITTER] : %s', error.stack);
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

      var filterResults = _.bind(this.filterResults, this);
      var parseResults = _.bind(this.parseData, this, runData.keyword, runData.runId);

      var resultsBatch = new Promise(function(resolve, reject){

        request.get(options,function(err, response, body){
          if(err){
            console.log('ERROR [TWITTER] : %s', err);
          } else {
            var raw = JSON.parse(body);
            var data = raw.statuses;
            var next = raw.search_metadata.next_results;

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

    get_raw_nugs: function(keyword,until,run_id){
        var self = this;

        var getToken = this.getToken(function(e,access_token,refresh_token,results){
            var options = {
                url:search_base+"?q=%23"+keyword+"&until="+until+"&result_type=recent&count=100",
                headers:{
                    "Authorization":"Bearer "+access_token
                }
            };
        });
    },

    parseData: function(keyword, runId, result){
      var obj = {};
      obj.tag = keyword;
      obj.origin = "twitter";
      obj.date_run = new Date().toISOString();
      obj.run_id = runId;
      obj.sentiment = 0.0;
      obj.date = new Date(Date.parse(result.created_at)).toISOString();
      obj.text = result.text.replace(/\r?\n|\r/g, " ").replace(/\'/g,"");
      obj.related_tags = "";
      obj.keywords = "";
      obj.origin_id = result.id_str;

      return obj;
    },

    filterResults: function(result){
      return result.lang === "en" && !result.retweeted_status;
    },

    getOAuth2: function(){
        var auth = new OAuth2(
          sails.config.globals.twitter_key,
          sails.config.globals.twitter_secret,
          "https://api.twitter.com/",
          null,
          "oauth2/token",
          null
        );

        return auth;
    },

    getToken:function(callback){
        var oauth2 = this.getOAuth2();

        var promise =  new Promise(function(resolve, reject){
          var cb = function(e, access_token, refresh_token, results){
              var obj = {
                e: e,
                accessToken: access_token,
                refreshToken: refresh_token,
                results: results
              };

              resolve(obj);
          };

          oauth2.getOAuthAccessToken(
            '',
            {
              'grant_type':'client_credentials'
            },
            cb
          );
        });

      return promise;

    }
};

