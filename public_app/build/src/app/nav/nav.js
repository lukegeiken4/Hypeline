angular.module('hypeLine.menu', [])

.controller('MenuCtrl', ["$scope", "$http", "$rootScope", "$log", "AuthService", function($scope, $http, $rootScope, $log, AuthService) {

  $rootScope.$on('user:updated', function(event, obj) {
    $scope.user = AuthService.get();
  });

  $scope.user = AuthService.get();

  $scope.logout = function(){
    AuthService.logout(true);
    $scope.user = null;
  };


}])

.directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'nav/nav.tpl.html',
    controller: 'MenuCtrl'
  };
});
