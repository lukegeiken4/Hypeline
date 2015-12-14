// Handle validation for controllers

module.exports = {

  error_handler: function(validation, payload){

    var validate = _.partial(this.validate, payload);
    var filter = _.partial(this.filter_validation, payload);
    var fields = _.filter(validation, filter);
    var errors = _.map(fields, validate);

    return errors;
  },

  filter_validation: function(payload, rule){
    return !payload[rule.field];
  },

  validate: function(payload, rule){

    // Custom validators accepted as functions
    if(rule.validator){
      // @TODO implement this later
    }
    // Default behavior is checking for presence of field
    else {
      if(!payload[rule.field]){
        return rule.message;
      }
    }

  }

};
