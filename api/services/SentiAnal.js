// EmailService.js - in api/services
var sys = require('sys');
var exec = require('child_process').exec;
var indico = require('indico.io');
var Promise = require('bluebird');
indico.apiKey =  'ecad6731e6472b85c27e6eab6d35e003';

module.exports = {

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
                        model_data[i].related_tags = JSON.stringify(anal_data[i]);
                        break;
                    case "keywords":
                        //console.log(JSON.stringify(anal_data[i].result));
                        model_data[i].keywords = JSON.stringify(anal_data[i]);
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
                    model_data[0].related_tags = JSON.stringify(anal_data[i]);
                    break;
                case "keywords":
                    model_data[0].keywords = JSON.stringify(anal_data[i]);
                    break;
                default:
                    console.log("Invalid type to add to model");
                    break;
            }

        }
        callback();
    },

    analPush: function(data, callback) {
        //Check data
        //Create string of text to use as python param
        var model_data = data.data;
        var batchInput = [];
        for(var i = 0; i < model_data.length; i++) {
            batchInput[i] = model_data[i].text;
        }


        // Sentiment Data
        var senti = new Promise(function(resolve, reject){
           
            indico.sentimentHQ(batchInput)
            .then(function(response){
                SentiAnal.setAnalInfo(model_data, response, "sentiment",function(){
                    resolve();
                });
            })
            .catch(function(logError){
                console.log(logError);
                reject();
            });
        });

        //Related Tage
        var tags = new Promise(function(resolve, reject) {
            indico.text_tags(batchInput)
            .then(function(response){

                SentiAnal.setAnalInfo(model_data, response, "text_tags",function(){
                    resolve();
                });
      
            })
            .catch(function(logError){
                console.log(logError);
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
                console.log(logError);
                reject();
            });
        });

        //When promises are done
        Promise.all([
            senti, tags, keywords
        ]).then(function(){
    
            for(var i = 0; i < model_data.length; i++) {
                Hype_nug.create(model_data[i]).exec(function createCB(err, created){
                    if(err) console.log(err);
                    else  console.log('Created hype nug with sentiment of  ' + created.sentiment);
                });
            }
            callback(true);
        });
    }
};