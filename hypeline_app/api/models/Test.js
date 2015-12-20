/**
* Test.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    model_id: {
      type: "string",
    },
    run_id: {
      type: "string"
    },
    unique_key: {
      type: "string",
      unique: true
    }
  },

  schema: true,

  beforeValidation: function(values, cb){
    values.unique_key = values.run_id + values.model_id;
    cb();
  }
};

