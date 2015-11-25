angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'hypeLine.userCreate',
  'hypeLine.userLogin',
  'hypeLine.hypeline',
  'hypeLine.menu',
  'highcharts-ng',
  'ui.router',
  'mdo-angular-cryptography'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $cryptoProvider ) {
  $urlRouterProvider.otherwise( '/home' );
  $cryptoProvider.setCryptographyKey('HpFNfvyWuVMuUK8c');
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | [hype]line' ;
    }
  });
})

.factory( 'Config', function ConfigFactory($rootScope){
    return {
        appRoot: 'http://localhost:1337',
        secretKey: 'HpFNfvyWuVMuUK8c'
    };
})

.factory( 'AuthService', function AuthFactory($rootScope, $location, Config, $crypto){
  var data = {},
      set = function(user){
        window.localStorage.setItem('user', user);
        $rootScope.$broadcast('user:updated');
      },
      formatter = {
        stringify: function (cipherParams) {
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }
            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            var jsonObj = JSON.parse(jsonStr);
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
            }
            return cipherParams;
        }
      },
      get = function(){
        var user = window.localStorage.getItem('user');
        if(user){

          var decrypted = CryptoJS.AES.decrypt(user.toString(), Config.secretKey, { format: formatter });
          data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
          var lastIndex = data.href.lastIndexOf('/');
          var userId = data.href.substring(lastIndex + 1);
          data.userId = userId;
        } else {
          data = null;
        }
        return data;
      },
      isLoggedIn = function(){
        var user = window.localStorage.getItem('user');
        if(user){
          return true;
        } else {
          return false;
        }
      },
      logout = function(){
        if(window.localStorage.getItem('user')){
          window.localStorage.removeItem('user');
        }
        $rootScope.$broadcast('user:updated');
        $location.path('/');
      };

  return {
    set: set,
    get: get,
    isLoggedIn: isLoggedIn,
    logout: logout
  };

})

.run( function run ($rootScope, $location, AuthService) {

  $rootScope.$on('$stateChangeStart', function () {
    var area = $location.url().split('/')[1];
    if(
      (
        area === 'app'
      ) &&
      !AuthService.isLoggedIn()){
        $location.path('user/login');
      }
  });

})

;

