// EmailService.js - in api/services
module.exports = {
    // or more concisely
    var sys = require('sys')
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { 
        sys.puts(stdout) 
    }
    
    analPush: function(data, terminate) {
        //Check data
        exec("echo $(python test.py 'Hello')", puts);
        //Get sentiment data
        //Create data model
        //Push into mongo

    }
};