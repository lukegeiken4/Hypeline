angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ngSanitize',
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

.factory( 'Config', function ConfigFactory($rootScope, $location){

  var area = $location.host();

  if(area.indexOf('192.169.165.29') > -1 || area.indexOf('hypeline.co') > -1){

    console.log('sending server request');
    return {
        appRoot: 'http://hypeline-app.herokuapp.com',
        secretKey: 'HpFNfvyWuVMuUK8c'
    };

  } else {
    console.log('sending local request');
    return {
        //appRoot: 'http://localhost:1337',
        appRoot: 'http://hypeline-app.herokuapp.com',
        secretKey: 'HpFNfvyWuVMuUK8c'
    };

  }
})

.factory( 'Messages', function MessageFactory(){

  var data = {},
      set = function(area, message){
        if(!data.area){
          data.area = [];
        }
        if(!_.contains(data.area, message)){
          data.area.push(message);
        }
      },
      get = function(area){
        if(!data.area){
          return null;
        } else if(data.area.length === 0){
            return null;
        } else {
          return data.area;
        }
      },
      clear = function(area){
        if(data.area){
          data.area = [];
        }
      };

    return {
      set: set,
      get: get,
      clear: clear
    };

})

.factory( 'AuthService', function AuthFactory($rootScope, $location, Config, $crypto, Messages){
  var data = {},
      set = function(user, redirect){
        window.localStorage.setItem('user', user);
        $rootScope.$broadcast('user:updated');
        if(redirect){
          $location.path('app');
        }
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
          data.authString = user;
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
      logout = function(redirect){
        if(window.localStorage.getItem('user')){
          window.localStorage.removeItem('user');
          if(redirect){
            $location.path('/');
          } else {
            $rootScope.$broadcast('user:updated');
          }
        }
      },
      handle = function(data){
        Messages.set('login', data.message);
        if(data.type === 'eject'){
          this.logout(false);
          $location.path('/user/login');
        }
      },
      eject = function(){
        var data = {
          message: "You must be logged in to perform this action.",
          type: 'eject'
        };
        this.handle(data);
      };

  return {
    set: set,
    get: get,
    isLoggedIn: isLoggedIn,
    logout: logout,
    handle: handle,
    eject: eject
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

