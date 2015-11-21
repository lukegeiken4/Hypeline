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

.controller( 'HypelineCtrl', function HomeController( $scope, $http, Config ) {
    
  $scope.defaultDates = function() {
    $scope.endDate = new Date();
    $scope.startDate = new Date(moment().startOf('month').utcOffset(0).format('YYYY-MM-DD HH:MM:SS Z'));
    $scope.tag = null;
    $scope.datesUpdated = moment().format('x');
  };
  
  
  $scope.defaultDates();
  $scope.format = 'yyyy-MM-dd';
  $scope.maxDate = new Date();
  
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
    console.log($scope.tag, new Date($scope.startDate).getTime(), new Date($scope.endDate).getTime());
    
  };

    
});

