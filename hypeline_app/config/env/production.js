/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  stormpath: {
    STORMPATH_CLIENT_APIKEY_ID: '37P6MBEP5UES6AZ3916AW1QRX',
    STORMPATH_CLIENT_APIKEY_SECRET: 'uSMrxf8qtV2omHemSUbkFypLONrqyRIHUqIMNeQiw54',
    STORMPATH_APPLICATION_HREF: 'https://api.stormpath.com/v1/applications/5TvJ7fCrN7LPQ8ShhTzKir',
    STORMPATH_DIRECTORY_HREF: 'https://api.stormpath.com/v1/directories/5Tvj3yxxUaAfHGzVvGoL2L'
  },

  crypto: {
    CRYPTO_KEY: 'HpFNfvyWuVMuUK8c'
  }

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
