angular.module( 'hypeLine.results', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'hypelineResults', {
    url: '/results/:id',
    views: {
      "main": {
        controller: 'HypelineResultsCtrl',
        templateUrl: 'hypeline/results.tpl.html'
      }
    },
    data:{ pageTitle: '[hype]line Results' }
  });
})

.controller( 'HypelineResultsCtrl', function HomeController( $scope, $http, Config, $stateParams, $log ) {

  console.log("here", $stateParams.id);
  $scope.runId = $stateParams.id;

})

.directive('resultsChart2', function($http, Config, $log){

  var linkFn = function(scope, elem, attrs){

    var grouping;

    scope.chartConfig = {
        series: [],
        title: {
           text: "Metric"
        },
        loading: true,
        xAxis: {
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,
          startOnTick: false
        },
        yAxis: {
          labels: {
            enabled: false
          }
        },
        options: {
          chart: {
            type: 'column'
          },
          plotOptions: {
            column: {
              stacking: 'normal'
            }
          },
          tooltip: {
            shared: true
          }
        }
    };

    fetch();

    function updateSeries(allSeries){
      scope.chartConfig.series = allSeries;
      var halfDay = 12 * 3600 * 1000;
      scope.chartConfig.xAxis.max = new Date(endDate).getTime() + halfDay;
      scope.chartConfig.xAxis.min = new Date(startDate).getTime() - halfDay;

      setAssociatedStatuses();
    }

    function removeAllSeries(){
      scope.chartConfig.series = [];
    }

    function updateData(data){
      scope.chartConfig.loading = false;

      var groups = [];
      data.forEach(function(item){

        var existing = groups.find(function(group){
          return group.hasOwnProperty('status_id') && group.status_id === item.order_status_id;
        });

        if(!existing){
          groups.push({
            status_id: item.order_status_id,
            name: item.order_status_id,
            data: []
          });
          existing = groups[groups.length - 1];
        }

        var formatted = item.date.split('T')[0],
            date = new Date(formatted).getTime(),
            label = moment(formatted).utcOffset(0).format('ddd, MMM Do');

        existing.data.push({x: date, y:item.count, name: label});
      });

      updateSeries(groups);

    }

    function setAssociatedStatuses(){
      if(scope.statuses && scope.chartConfig.series.length > 0){
        scope.chartConfig.series.forEach(function(series){

          var name = scope.statuses.find(function(status){
            return status.id === series.status_id;
          });

          if(name){
            series.name = name.name;
          }

        });

      }
    }

    function fetch(){
      $http.get(Config.appRoot + '/view?run_id=' + scope.runid)
      .then(
        function(data){
          if(data.data.length > 0){
            updateData(data.data);
          }
        },
        function(data){
          $log.error('Error fetching', data);
          scope.chartConfig.loading = "Error fetching data";
        }
      );
    }

  };

  return {
    restrict: 'E',
    scope: {
      type: '@',
      name: '@',
      runid: '@'
    },
    templateUrl: 'hypeline/chart.tpl.html',
    link: linkFn
  };

})

;

