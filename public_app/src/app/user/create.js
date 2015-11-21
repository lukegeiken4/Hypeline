angular.module( 'hypeLine.userCreate', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'user', {
    url: '/user/create',
    views: {
      "main": {
        controller: 'UserCreateCtrl',
        templateUrl: 'user/create.tpl.html'
      }
    },
    data:{ pageTitle: 'Create User' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'UserCreateCtrl', function HomeController( $scope, $http, Config ) {
    
    $scope.user = {};
    
    $scope.createUser = function(){
        console.log('user', $scope.user);
        console.log(Config);
        $http.post(Config.appRoot + '/user/create', $scope.user)
        .then(
            function(data){
                console.log('success', data);
            },
            function(data){
                console.log('failure', data);
            }
        );
    };
    
})

;

