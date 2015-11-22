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
        enum:["twitter","instagram","vine"],
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
        type:"string"/*,
        required: true*/
    },
    keywords:{
        type:"string"/*,
        required: true*/
    }
  },
  schema:true
};

