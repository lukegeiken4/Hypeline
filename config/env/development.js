/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  stormpath: {
    STORMPATH_CLIENT_APIKEY_ID: 'L0SORYBK34HEUCZU6CXODXJ0X',
    STORMPATH_CLIENT_APIKEY_SECRET: 'QX0giegzslG2NwWOv33D9tPLlom6qxArX4l102kwSkI',
    STORMPATH_APPLICATION_HREF: 'https://api.stormpath.com/v1/applications/5TvJ7fCrN7LPQ8ShhTzKir'
  }

};
