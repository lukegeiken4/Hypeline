/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
var stormpath = require('stormpath');
var node_cryptojs = require('node-cryptojs-aes');
var CryptoJS = node_cryptojs.CryptoJS;
var JsonFormatter = node_cryptojs.JsonFormatter;

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  if(req.body.demo && req.body.demo === true){
    var application = getAuthApp();
    application.client.getAccount('https://api.stormpath.com/v1/accounts/2iTohWzF9SOKMIJ0B3gnuX', function(err, account){
      if(err){
        console.log('error fetching account', err);
        noUser();
      } else {
        return next();
      }
    });

  } else if(!req.body.auth_string){
    noUser();
  } else {
    var key = sails.config.crypto['CRYPTO_KEY'];
    var decrypted = CryptoJS.AES.decrypt(req.body.auth_string.toString(), key, { format: JsonFormatter });
    var data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    var application = getAuthApp();
    application.client.getAccount(data.href, function(err, account){
      if(err){
        console.log('error fetching account', err);
        noUser();
      } else {
        if(account.status === 'ENABLED'){
          return next();
        } else {
          userDisabled();
        }
      }
    });
  }

  function getAuthApp(){
    var apiKey = new stormpath.ApiKey(
      sails.config.stormpath['STORMPATH_CLIENT_APIKEY_ID'],
      sails.config.stormpath['STORMPATH_CLIENT_APIKEY_SECRET']
    );

    var client = new stormpath.Client({ apiKey: apiKey });
    var applicationHref = sails.config.stormpath['STORMPATH_APPLICATION_HREF'];
    return {client:client, applicationHref: applicationHref};
  }

  function userDisabled(){
    return res.send(403, {message: 'User is disabled. Please contact us.', type: 'eject'});
  }

  function noUser(){
    return res.send(403, {message: 'You must be logged in to preform this action.', type: 'eject'});
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  function returnForbidden(){
    return res.send(403, {message: 'You are not permitted to perform this action.'});
  }
};
