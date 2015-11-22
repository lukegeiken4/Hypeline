angular.module( 'hypeLine.hypeline', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'hypeline', {
    url: '/app',
    views: {
      "main": {
        controller: 'HypelineCtrl',
        templateUrl: 'hypeline/index.tpl.html'
      }
    },
    data:{ pageTitle: 'Get your hypeline' }
  });
})

.controller( 'HypelineCtrl', function HypelineController( $scope, $http, Config, $rootScope, AuthService ) {

  $scope.defaultDates = function() {
    $scope.endDate = new Date();
    $scope.startDate = new Date(moment().startOf('month').utcOffset(0).format('YYYY-MM-DD HH:MM:SS Z'));
    $scope.tag = null;
    $scope.datesUpdated = moment().format('x');
  };


  $scope.defaultDates();
  $scope.format = 'yyyy-MM-dd';
  $scope.maxDate = new Date();

  var setUser = function(){
    $scope.user = AuthService.get();
    console.log($scope.user);
  };

  $rootScope.$on("user:updated",setUser);

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    showWeeks: false
  };

  $scope.status = {
    opened: false
  };

  $scope.applyDates = function(){
    $scope.datesUpdated = moment().format('x');
  };


  $scope.go = function(){
    if(!$scope.user){
      setUser();
      if($scope.user){
        go();
      } else {
        console.log('No user');
      }
    } else {
      go();
    }

    function go(){
      $scope.loading = true;
      //console.log($scope.tag, new Date($scope.startDate).getTime(), new Date($scope.endDate).getTime());
      var lastIndex = $scope.user.href.lastIndexOf('/');
      var userId = $scope.user.href.substring(lastIndex + 1);
      var url = Config.appRoot + '/analyze?origin=twitter&user_id=' + userId + '&keyword=' + $scope.tag;
      $http.get(url)
      .then(
        function(data){
          console.log('success',data);
        },
        function(data){
          console.log('error', data);
        }
      );
    }
  };


});

