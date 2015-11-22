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
  $scope.platforms = {};

  var setUser = function(){
    $scope.user = AuthService.get();
  };

  if($scope.user){
    getUserRuns();
  } else {
    setUser();
    getUserRuns();
  }

  $rootScope.$on("user:updated",setUser);

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.opened = true;
  };

  $scope.runs = [];

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

  function getUserRuns(){
    $scope.runs = [];
    $scope.runLoading = true;
    var url = Config.appRoot + '/run?user_id=' + $scope.user.userId;
    $http.get(url)
    .then(
      function(data){
        parseUserRuns(data.data);
        $scope.runLoading = false;
      },
      function(data){
        console.log('error fetching runs', data.data);
      }
    );
  }

  $scope.getRun = function(run){
    $scope.runId = run.runId;
  };

  function parseUserRuns(data){
    data.forEach(function(run){
      $scope.runs.push({
        tag: run.keyword,
        startDate: run.hasOwnProperty('start_date') ? moment(run.start_date).format('MM-DD-YYYY') : '?',
        endDate: run.hasOwnProperty('end_date') ? moment(run.end_date).format('MM-DD-YYYY') : '?',
        runId: run.run_id
      });
    });
  }

  function graphRun(run){
    console.log(run);
  }

  $scope.go = function(){
    getPlatforms();
    if(!$scope.user){
      setUser();
      if($scope.user){
        go();
      } else {
        console.log('No user');
        $location.path('user/login');
      }
    } else {
      go();
    }

    function getPlatforms(){
      var platforms = [];
      var twitter = {key: 'twitter', value: $scope.platforms.twitter};
      var tumblr = {key: 'tumblr', value: $scope.platforms.tumblr};
      var gplus = {key: 'gplus', value: $scope.platforms.gplus};
      var vine = {key: 'vine', value: $scope.platforms.vine};
      var instagram = {key: 'instagram', value: $scope.platforms.instagram};

      platforms.push(twitter);
      platforms.push(tumblr);
      platforms.push(gplus);
      platforms.push(vine);
      platforms.push(instagram);

      var platformString = _.chain(platforms)
      .filter(function(item){
        return item.value;
      })
      .map(function(item){
        return item.key;
      }).value();

      return platformString.join(',');
    }

    function go(){
      $scope.loading = true;
      var url = Config.appRoot + '/analyze?origin=' + getPlatforms() + '&user_id=' + $scope.user.userId + '&keyword=' + $scope.tag + '&start_date=' + $scope.startDate + '&end_date=' + $scope.endDate;
      $http.get(url)
      .then(
        function(data){
          console.log('success',data);
          getUserRuns();
        },
        function(data){
          console.log('error', data);
        }
      );
    }
  };


})

.directive('resultsChart', function($http, Config, $log){

  var linkFn = function(scope, elem, attrs){

    scope.chart = false;

    scope.chartConfig = {
        series: [],
        title: {
           text: "Metric"
        },
        loading: true,
        xAxis: {
          //type: 'datetime',
          //tickInterval: 24 * 3600 * 1000,
          startOnTick: false
        },
        yAxis: {
          labels: {
            enabled: false
          }
        },
        options: {
          chart: {
            type: 'line'
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

    scope.$parent.$watch('runId', function(){
      fetch();
    });

    function getBracketedResults(data){
      var sorted = _.sortBy(data, sortBySentimentScore);
      scope.bottomTen = sorted.slice(0,10);
      scope.topTen = sorted.slice((sorted.length - 11), sorted.length - 1);
      console.log(scope.topTen);
    }

    function sortBySentimentScore(item){
      return item.y;
    }

    function getAssociatedData(keywords){
      scope.keywords = keywords;
    }

    function updateSeries(allSeries){

      var min = _.min(allSeries.data, getDate);
      var max = _.max(allSeries.data, getDate);
      scope.chartConfig.series = [allSeries];
      scope.chartConfig.series[0].name = allSeries.data[0].tag;
      scope.chartConfig.title.text = "#" + allSeries.data[0].tag + " [ " + moment(min.x).format('M/D/YY, HH:MM') + " - " + moment(min.x).format('M/D/YY, HH:MM') + " ]";

      //scope.chartConfig.xAxis.max = new Date(max.x).getTime() + halfDay;
      //scope.chartConfig.xAxis.min = new Date(min.x).getTime() - halfDay;
    }

    function getDate(item){
      return item.x;
    }

    function removeAllSeries(){
      scope.chartConfig.series = [];
    }

    function updateData(data){
      scope.chartConfig.loading = false;
      scope.chart = true;

      var groups = _.groupBy(data.nugs, groupByDate);
      var points = _.map(groups, averageSentimentScorePerTimestamp);
      var sorted = _.sortBy(points, sortByDate);
      console.log(sorted);
      getBracketedResults(points);
      getAssociatedData(data.keywords);

      updateSeries({data: sorted});
    }

    function sortByDate(item){
      return item.x;
    }

    function groupByDate(item){
      return item.date;
    }

    function averageSentimentScorePerTimestamp(item){
      var dataPoint = {};
      var total = 0;

      for(var i=0;i<item.length; i++){
        total += item[i].sentiment;
      }

      var average = total/item.length;
      var formatted = item[0].date.split('T')[0];
      var date = new Date(formatted).getTime();
      var label = moment(formatted).utcOffset(0).format('ddd, MMM Do');

      return {
        x: new Date(item[0].date).getTime(),
        y: average * 100,
        name: label,
        tag: item[0].tag,
        raw: item
      };

    }

    function fetch(){
      $http.get(Config.appRoot + '/search?run_id=' + scope.runid)
      .then(
        function(data){
          if(data.data.data.nugs.length > 0){
            updateData(data.data.data);
          } else {
            scope.$parent.noDataError = 'No data present';
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

