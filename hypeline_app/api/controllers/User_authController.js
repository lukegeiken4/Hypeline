/**
 * User_authController
 *
 * @description :: Server-side logic for managing user_auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var stormpath = require('stormpath');

module.exports = {

  getAuthApp: function(){
    var apiKey = new stormpath.ApiKey(
      sails.config.stormpath['STORMPATH_CLIENT_APIKEY_ID'],
      sails.config.stormpath['STORMPATH_CLIENT_APIKEY_SECRET']
    );

    var client = new stormpath.Client({ apiKey: apiKey });
    var applicationHref = sails.config.stormpath['STORMPATH_APPLICATION_HREF'];
    return {client:client, applicationHref: applicationHref};

    //client.getApplication(applicationHref, function(err, application) {
    //  console.log('Application:', application);
    //  return application;
    //});
  },

  createUser: function(req, res){

    var client = this.getAuthApp();
    var data = req.body;

    client.client.getApplication(client.applicationHref, function(err, application) {
      var account = {
        givenName: data.firstName,
        surname: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        customData: {
          org: data.organization || null
        }
      };
      application.createAccount(account, function(err, createdAccount) {
          if(err){
            console.log(err);
            return res.send(503, {error: err.userMessage});
          } else {
            return res.send(200, {message: 'user created'});
          }
      });
    });
  },

  getUser: function(data){
    var application = this.getAuthApp();

    application.getAccounts({ username: 'tk421' }, function(err, accounts) {
      accounts.each(function(account, callback) {
        console.log('Account:', account);
        callback();
      }, function(err) {
        console.log('Finished iterating over accounts.');
      });
    });
  },

  authUser: function(req, res){

    var client = this.getAuthApp()
    var data = req.body;

    var authRequest = {
      username: data.userName,
      password: data.password
    };

    client.client.getApplication(client.applicationHref, function(err, application) {
      application.authenticateAccount(authRequest, function(err, result) {
        // If successful, the authentication result will have a method,
        // getAccount(), for getting the authenticated account.
        if(err){
            console.log(err);
            res.send(503, {error: err.userMessage});
        } else {
          result.getAccount(function(err, account) {
            if(err){
              console.log(err);
              res.send(401, {error: err.userMessage});
            } else {
              res.send(200, {account: account});
            }
          });
        }
      });
    });
  },

  sendUserReset: function(data){

    var application = this.getAuthApp();

    var email = 'tk421@stormpath.com';

    application.sendPasswordResetEmail({ email: email }, function(err, passwordResetToken) {
      // The token is the last part of the HREF.
      console.log(passwordResetToken.href.split('/').pop());

      // The account can be retrieved by using the getAccount() method.
      client.getAccount(passwordResetToken.account.href, function(err, account) {
        console.log('Account:', account);
      });
    });
  },

  resetPassword: function(){

    var application = this.getAuthApp();
    var token = req.body.token;
    var password = req.body.password;

    application.resetPassword(token, password, function(err, result) {
      if (err) {
        // The token has been used or is expired - have the user request a new token.
        return console.error(err);
      }

      // The response contains a link to the account which is
      // associated with this password reset workflow.
      console.log('Account HREF:', result.account.href);
    });

  },

  setAuth: function(account){

  }


};

