/**
* Run.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    run_id: {
        type:"integer",
        required:true
    },
    media:{
        type:"array"
    },
    user_id:{
        type:"string",
        required:true
    },
    keyword:{
        type:"string",
    },
    start_date:{
        type:"datetime"
    },
    end_date:{
        type:"datetime"
    },
    one_time: {
      type: "boolean",
      default: true
    },
    frequency: {
      type: "integer",
      default: 0
    }
  },
  schema:true,
  indexes:[
    {
        attributes:{run_id:1},
        options:{unique:true}
    }
  ],
};

