/**
* Hype_nug.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    type:{
        type:"string",
        defaultsTo:"datapoint"
    },
    origin_id:{
        type:"string",
        required:true
    },
    date:{
        type:"datetime"/*,
        required:true*/
    },
    text:{
        type:"string",
        required:true
    },
    tag:{
        type:"string",
        required:true
    },
    origin:{
        type:"string",
        enum:["twitter","instagram","vine","gplus","tumblr","test"],
        required:true
    },
    date_run:{
        type:"datetime"/*,
        required:true*/
    },
    run_id:{
        type:"string"
    },
    sentiment:{
        type:"float",
        required:true
    },
    related_tags:{
        type:"json"/*,
        required: true*/
    },
    keywords:{
        type:"json"/*,
        required: true*/
    },
    unique_key: {
      type: "string",
      required: true
    }
  },

  schema:true,

  beforeValidation: function(values, cb){
    values.unique_key = values.run_id + "-" + values.origin_id;
    cb();
  }
};

