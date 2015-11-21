// EmailService.js - in api/services
var sys = require('sys');
var exec = require('child_process').exec;
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
        var python_command = "echo $(python test.py "+params+")";

        callback(exec(python_command, function(error, stdout, stderr){
            if(!error) {
                //Update the data model
                var output_arr = JSON.parse(stdout);
                //If output is array, then multiple models were sent
                if(output_arr.constructor === Array) {
                    for (var i=0; i < output_arr.length;i++ ) {
                        //Push into mongo
                        model_data[i].sentiment = output_arr[i];

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