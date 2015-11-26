// UserService.js - in api/services


module.exports = {
  isValidUser: function(){
    var apiKey = new stormpath.ApiKey(
      sails.config.stormpath['STORMPATH_CLIENT_APIKEY_ID'],
      sails.config.stormpath['STORMPATH_CLIENT_APIKEY_SECRET']
    );
  }
};
