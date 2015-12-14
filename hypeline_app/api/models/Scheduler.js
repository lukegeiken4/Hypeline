/**
* Scheduler.js
*
* @description :: Scheduler model used for managine scheduled results fetching
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    run_id: {
      type: "string",
      //required: true
    },
    frequency: {
      type: "integer",
      //default: 600,
      //required: true
    },
    last_ran: {
      type: "datetime"
    },
    active: {
      type: "boolean",
      //default: true
    },
    user_id: {
      type: "string",
      //required: true
    }
  },

  schema: true
};

