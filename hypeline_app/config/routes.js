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

  'GET /test': 'Hype_nugController.testPush',
  'POST /twitter_test': 'NewTwitterController.testRun',
  'POST /gplus_test': 'NewGplusController.testRun',
  'POST /instagram_test': 'NewInstagramController.testRun',
  'POST /vine_test': 'NewVineController.testRun',
  'POST /tumblr_test': 'NewTumblrController.testRun',

  'POST /analyze':"AnalyzeController.get_nugs",
  'POST /search':"AnalyzeController.find_run",
  'POST /delete_run': "AnalyzeController.delete_run",
  'POST /run': 'RunController.get_user_runs',
  'POST /run/remove': 'AnalyzeController.delete_run',
  'POST /schedule/test/queue': 'RunController.test_queue'
};
