angular.module( 'hypeLine.userLogin', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'userLogin', {
    url: '/user/login',
    views: {
      "main": {
        controller: 'UserLoginCtrl',
        templateUrl: 'user/login.tpl.html'
      }
    },
    data:{ pageTitle: 'User Login' }
  });
})

.controller( 'UserLoginCtrl', function LoginController( $scope, $http, Config, $location, AuthService ) {

    $scope.user2 = {
      userName: 'jeff.shinrock@gmail.com',
      password: 'Mav*ncat12'
    };

    $scope.login = function(){
      $scope.loading = true;
      console.log('login');
      $http.post(Config.appRoot + '/user/login', $scope.user2)
      .then(
          function(data){
              console.log('success', data);
              AuthService.set(data.data.account);
              $scope.loading = false;
              $location.path('app');
          },
          function(data){
              console.log('failure', data);
              $scope.error = data.data.error;
              $scope.loading = false;
          }
      );
    };

})

;

