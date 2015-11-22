/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 */
module.exports.globals = {

  /****************************************************************************
  *                                                                           *
  * Expose the lodash installed in Sails core as a global variable. If this   *
  * is disabled, like any other node module you can always run npm install    *
  * lodash --save, then var _ = require('lodash') at the top of any file.     *
  *                                                                           *
  ****************************************************************************/
  twitter_secret: "MXcpyi3g6xF2rnF41eXyXopjFoFowpbx5zPHpkog8iokL44HHQ",
  twitter_key: "Z6776OJNzXhhzOPbmSAp5Napb",
  facebook_secret: "446baba6f4d102c07b59a90b6aad5ee5",
  facebook_key: "1712266155651439",
  instagram_access: "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587", //"278540041.0e2ff05.ad90ef5dff2147388cf9b33caa0162ae"
  gplus_access: "AIzaSyCQoSJD2HCo0GURiQCUGWJdGxRZ_PqMbh0",
  tumblr_key: "pYMvDiSRgpkr4XrdTkIC8K8IVH3lnfrlTJpRiGmFdGMMldmUA2"

	// _: true,

  /****************************************************************************
  *                                                                           *
  * Expose the async installed in Sails core as a global variable. If this is *
  * disabled, like any other node module you can always run npm install async *
  * --save, then var async = require('async') at the top of any file.         *
  *                                                                           *
  ****************************************************************************/

	// async: true,

  /****************************************************************************
  *                                                                           *
  * Expose the sails instance representing your app. If this is disabled, you *
  * can still get access via req._sails.                                      *
  *                                                                           *
  ****************************************************************************/

	// sails: true,

  /****************************************************************************
  *                                                                           *
  * Expose each of your app's services as global variables (using their       *
  * "globalId"). E.g. a service defined in api/models/NaturalLanguage.js      *
  * would have a globalId of NaturalLanguage by default. If this is disabled, *
  * you can still access your services via sails.services.*                   *
  *                                                                           *
  ****************************************************************************/

	// services: true,

  /****************************************************************************
  *                                                                           *
  * Expose each of your app's models as global variables (using their         *
  * "globalId"). E.g. a model defined in api/models/User.js would have a      *
  * globalId of User by default. If this is disabled, you can still access    *
  * your models via sails.models.*.                                           *
  *                                                                           *
  ****************************************************************************/

	// models: true
};
