angular.module('hypeLine.menu', [])

.controller('MenuCtrl', function($scope, $http, $rootScope, $log, AuthService) {

  $rootScope.$on('user:updated', function(event, obj) {
    $scope.user = AuthService.get();
    console.log($scope.user);
  });


  $scope.user = AuthService.get();

  $scope.logout = function(){
    AuthService.logout();
  };


})

.directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'nav/nav.tpl.html',
    controller: 'MenuCtrl'
  };
});
