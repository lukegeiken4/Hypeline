angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'hypeLine.userCreate',
  'hypeLine.userLogin',
  'hypeLine.hypeline',
  'hypeLine.results',
  'highcharts-ng',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ($rootScope) {

  var updatedUser = function(){
    console.log('updated');
  };

  $rootScope.$on("user:updated",updatedUser);

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
        appRoot: 'http://localhost:1337'
    };
})

.factory( 'AuthService', function AuthFactory($rootScope){
  var data = {},
      set = function(user){
        window.localStorage.setItem('user', JSON.stringify(user));
        $rootScope.$broadcast('user:updated');
      },
      get = function(){
        var user = window.localStorage.getItem('user');
        if(user){
          data = JSON.parse(user);
          var lastIndex = data.href.lastIndexOf('/');
          var userId = data.href.substring(lastIndex + 1);
          data.userId = userId;
        } else {
          data = false;
        }
        return data;
      },
      isLoggedIn = function(){
        var user = window.localStorage.getItem('getItem', 'user');
        if(user){
          return true;
        } else {
          return false;
        }
      };

  return {
    set: set,
    get: get,
    isLoggedIn: isLoggedIn
  };

})

;

