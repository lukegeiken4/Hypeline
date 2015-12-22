/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'POST /user/login': 'User_authController.authUser',
  'POST /user/create': 'User_authController.createUser',
  'POST /user/send_reset': 'User_authController.sendUserReset',
  'POST /user/reset': 'User_authController.resetPassword',

  // @TODO ADMIN STUFF, MAKE THESE HAVE SPECIAL POLICIES

  // USING THESE FOR TESTING IF NECESSARY
  //'GET /test': 'Hype_nugController.testPush', TEST PUSH OF NUGS
  //'POST /twitter_test': 'NewTwitterController.testRun', GET TWITTER RESULTS (DON'T PROCCESS SENTIMENT)
  //'POST /gplus_test': 'NewGplusController.testRun', GET GPLUS RESULTS (DON'T PROCCESS SENTIMENT)
  //'POST /instagram_test': 'NewInstagramController.testRun', GET INSTA RESULTS (DON'T PROCCESS SENTIMENT)
  //'POST /vine_test': 'NewVineController.testRun', GET VINE RESULTS (DON'T PROCCESS SENTIMENT)
  //'POST /tumblr_test': 'NewTumblrController.testRun', GET TUMBLR RESULTS (DON'T PROCCESS SENTIMENT)

  //'GET /test/duplicates': 'TestController.findDupes', EXAMPLE FOR MONGO NATIVE CALL, USED TO FIND DUPLICATES HERE
  //'GET /test/runs': 'TestController.run_test', FIND FIRST RUN AND ALL NUGS
  //'POST /test/runs': 'TestController.run_test', FIND A RUN AND ALL NUGS (ACCEPTS RUN_ID)
  //'GET /test/orphans': 'TestController.destroy_orphan_nugs', USE THIS TO CHECK FOR NUGS WITHOUT RUN_ID
  //'GET /test/create': 'TestController.create_dummy_run', CREATES A RUN WITH RUN_ID OF '1' (USED FOR TESTING PLATFORMS)
  //'POST /run/test/make': 'TestController.make_complete' IF YOU NEED TO MAKE A SMALL RUN TO TEST WITH
  //'GET /test/destroy': 'TestController.destroy_test_run', DESTROY RUN CREATED ABOVE
  //'POST /nugs/find': 'TestController.find_nug_by_id', IF YOU NEED TO FIND ALL NUGS OF A KEYWORD

  'POST /analyze':"AnalyzeController.get_nugs",
  'POST /analyze/unique':"AnalyzeController.get_unique_ids",
  'POST /search':"AnalyzeController.find_run",
  'POST /delete_run': "AnalyzeController.delete_run",
  'POST /run': 'RunController.get_user_runs',
  'POST /run/remove': 'AnalyzeController.delete_run',
  'POST /schedule/test/queue': 'RunController.test_queue',
  'POST /run/remove': 'RunController.remove_run_and_nugs',
  'POST /run/all': 'RunController.get_all_runs'

};
