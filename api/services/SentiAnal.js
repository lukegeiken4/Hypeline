// EmailService.js - in api/services
var sys = require('sys');
var exec = require('child_process').exec;
var request = require("request");
module.exports = {

    
    analPush: function(data, terminate, callback) {
        //Check data
        //Create string of text to use as python param
        var model_data = data.data;
        var params = "";
        for(var i = 0; i < model_data.length; i++) {
            if(i==0) params += "'" + model_data[i].text + "'";
            else params += " '" + model_data[i].text + "'";

        }

        //Get sentiment data
        var python_command = "echo $(python sentiment.py "+params+")";
        callback(exec(python_command, function(error, stdout, stderr){
            if(!error) {
                //Update the data model
                var output_arr = JSON.parse(stdout);
                //If output is array, then multiple models were sent
                if(output_arr.constructor === Array) {
                    for (var i=0; i < output_arr.length;i++ ) {
                        //Push into mongo
                        model_data[i].sentiment = output_arr[i];
                        console.log(JSON.stringify(model_data[i]));
                        Hype_nug.create(model_data[i]).exec(function createCB(err, created){
                            if(err) console.log("could not create hype nug");
                            else  console.log('Created hype nug with sentiment of  ' + created.sentiment);
                        });
                    };
                } else {
                    //Only a single model was sent
                     model_data[0].sentiment = output_arr;
                }
                return true;
            } 
            console.log(stderr);
            return false;
        }));
    }
};