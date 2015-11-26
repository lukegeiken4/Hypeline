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

.controller( 'UserLoginCtrl', function LoginController( $scope, $http, Config, $location, AuthService, Messages, $sanitize ) {

    var messages = Messages.get('login');
    if(messages){
      $scope.messages = messages.join('<br />');
      Messages.clear('login');
    }

    $scope.login = function(){
      $scope.loading = true;
      $http.post(Config.appRoot + '/user/login', $scope.user)
      .then(
          function(data){
              console.log('success', data);
              AuthService.set(data.data.account, true);
              $scope.loading = false;
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

