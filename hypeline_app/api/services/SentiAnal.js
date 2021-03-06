// EmailService.js - in api/services
var sys = require('sys');
var exec = require('child_process').exec;
var when = require('when');
var indico = require('indico.io');
indico.apiKey =  sails.config.indico.API_KEY;

module.exports = {

    parseTags: function(keyword_data) {
        var arr=[];
        for(var obj in keyword_data){
         arr.push([obj,keyword_data[obj]])
        }
        arr.sort(function(a,b){return b[1] - a[1]});

        var top_keywords = {};
        for(var i=0;i<5;i++) {
            if(arr[i] != null) {
                var val = arr[i];
                top_keywords[val[0]] = val[1];
            }
        }
        return top_keywords;
    },

    setAnalInfo: function(model_data, anal_data, type, callback) {

        //If output is array, then multiple models were sent
        if(anal_data.constructor === Array) {
            for (var i=0; i < anal_data.length;i++ ) {
                //Set new information
                switch(type){
                    case "sentiment":
                        model_data[i].sentiment = anal_data[i];
                        break;
                    case "text_tags":
                        model_data[i].related_tags = SentiAnal.parseTags(anal_data[i]);
                        break;
                    case "keywords":
                        model_data[i].keywords = anal_data[i];
                        break;
                    default:
                        console.log("Invalid type to add to model");
                        break;
                }
            };
        } else {
            //Only a single model was sent
            switch(type){
                case "sentiment":
                    model_data[0].sentiment = anal_data[i];
                    break;
                case "text_tags":
                    model_data[0].related_tags = SentiAnal.parseTags(anal_data[i]);
                    break;
                case "keywords":
                    model_data[0].keywords = anal_data[i];
                    break;
                default:
                    console.log("Invalid type to add to model");
                    break;
            }

        }
        callback();
    },

    analPush: function(data) {

      var models = new Promise(function(resolve, reject){

        //Check data
        //Create string of text to use as python param
        var model_data = data.data;
        var batchInput = [];
        for(var i = 0; i < model_data.length; i++) {
            batchInput[i] = model_data[i].text;
        }

        if(batchInput.length > 0){

          // Sentiment Data
          var senti = new Promise(function(resolve, reject){

              indico.sentimentHQ(batchInput)
              .then(function(response){
                  SentiAnal.setAnalInfo(model_data, response, "sentiment",function(){
                      resolve();
                  });
              })
              .catch(function(logError){
                  console.log('ERROR [SENTIMENT] : %s', logError);
                  reject();
              });
          });

          //Related Tag
          var tags = new Promise(function(resolve, reject) {
              indico.text_tags(batchInput)
              .then(function(response){
                  SentiAnal.setAnalInfo(model_data, response, "text_tags",function(){
                      resolve();
                  });

              })
              .catch(function(logError){
                  console.log('ERROR [SENTIMENT] : %s', logError);;
                  reject();
              });
          });

          //Keywords
          var keywords = new Promise(function(resolve, reject){
              indico.keywords(batchInput)
              .then(function(response){
                  SentiAnal.setAnalInfo(model_data, response, "keywords",function(){
                      resolve();
                  });
              })
              .catch(function(logError){
                  console.log('ERROR [SENTIMENT] : %s', logError);
                  reject();
              });
          });

          //When promises are done
          Promise.all([
              senti, tags, keywords
          ]).then(function(){
              Hype_nug.create([model_data]).exec(function(err, models){
                if(err){
                  console.log('ERROR', err);
                  reject(err);
                } else {
                  console.log("Created %s HypeNugs", _.flatten(models).length);
                  resolve(models);
                }
              });
          });

        } else {

          console.log('No models to process');
          resolve(null);

        }

      });

      return models;

    }
};
