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
.controller( 'UserCreateCtrl', function HomeController( $scope, $http, Config, $location ) {

    $scope.user = {};

    $scope.createUser = function(){
        $http.post(Config.appRoot + '/user/create', $scope.user)
        .then(
            function(data){
                console.log('success', data);
                $location.path('/');
                AuthService.set(data.data.account);
            },
            function(data){
                console.log('failure', data);
                $scope.error = data.data.error;
            }
        );
    };

})

;

