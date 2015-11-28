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

.controller( 'HypelineCtrl', function HypelineController( $scope, $http, Config, $rootScope, AuthService, $sanitize ) {

  $scope.defaultDates = function() {
    $scope.endDate = new Date();
    $scope.startDate = new Date(moment().startOf('month').utcOffset(0).format('YYYY-MM-DD HH:MM:SS Z'));
    $scope.tag = null;
    $scope.datesUpdated = moment().format('x');
  };

  $scope.platforms = {};
  $scope.inputError = false;
  $scope.run = {
    message: false
  };

  $scope.newRun = true;
  $scope.openNewRun = function(val){
    $scope.newRun = val;
  };

  var setUser = function(){
    $scope.user = AuthService.get();
    if($scope.user){
      getUserRuns();
    } else {
      AuthService.eject();
    }
  };

  if($scope.user){
    getUserRuns();
  } else {
    setUser();
  }

  $rootScope.$on("user:updated",setUser);

  $scope.runs = [];

  function getUserRuns(){
    $scope.runs = [];
    $scope.runLoading = true;
    var params = {
      user_id: $scope.user.userId,
      auth_string: $scope.user.authString
    };
    var url = Config.appRoot + '/run';
    $http.post(url, params)
    .then(
      function(data){
        parseUserRuns(data.data);
        $scope.runLoading = false;
      },
      function(data){
        console.log('error fetching runs', data.data);
        AuthService.handle(data.data);
      }
    );
  }

  $scope.getRun = function(run){
    $scope.runId = run.runId;
  };

  $scope.showOptions = function(run){
    run.showOptions = true;
  };

  $scope.hideOptions = function(run){
    run.showOptions = false;
  };

  $scope.deleteRun = function(run){
      var params = {
        run_id: run.runId,
        auth_string: $scope.user.authString
      };
      var url = Config.appRoot + '/run/remove';
      $http.post(url, params)
      .then(
        function(data){
          $scope.run.message = "Successfully deleted";
          getUserRuns();
        },
        function(data){
          console.log('Error deleting run', data.data.error);
          $scope.run.message = "Error";
        }
      );
  };

  function parseUserRuns(data){
    data.forEach(function(run){
      $scope.runs.push({
        tag: run.keyword.trim(),
        startDate: run.hasOwnProperty('start_date') ? moment(run.start_date).format('MM-DD-YYYY') : '?',
        endDate: run.hasOwnProperty('end_date') ? moment(run.end_date).format('MM-DD-YYYY') : '?',
        runId: run.run_id,
        runDate: moment(run.createdAt).format('MM-DD-YYYY @ h:mm a')
      });
    });
    $scope.getRun(_.last($scope.runs));
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
      if($scope.user){
        $scope.loading = true;
        var platforms = getPlatforms();
        var params = {
          origin: platforms,
          user_id: $scope.user.userId,
          keyword: $scope.tag,
          start_date: $scope.startDate,
          end_date: $scope.endDate,
          auth_string: $scope.user.authString
        };
        var url = Config.appRoot + '/analyze';
        $http.post(url, params)
        .then(
          function(data){
            getUserRuns();
          },
          function(data){
            console.log('error', data);
            if(data.data.error){
              $scope.inputError = data.data.error;
            }
            if(data.data.errors){
              $scope.inputError = data.data.errors.join('<br />');
            }
          }
        );
      }
    }
  };


})

.directive('resultsChart', function($http, Config, $log){

  var linkFn = function(scope, elem, attrs){

    scope.chart = false;
    scope.timegroup = 'minute';
    scope.limitDate = false;
    scope.chartOptions = false;
    scope.toggleOptions = function(){
      scope.chartOptions = !scope.chartOptions;
    };

    // date stuff
    scope.endDate = new Date();
    scope.startDate = new Date(moment().startOf('month').utcOffset(0).format('YYYY-MM-DD HH:MM:SS Z'));
    scope.datesUpdated = moment().format('x');
    scope.format = 'yyyy-MM-dd';
    scope.maxDate = new Date();

    scope.open = function($event, picker) {
      $event.preventDefault();
      $event.stopPropagation();
      scope.status[picker].opened = true;
    };

    scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      showWeeks: false
    };

    scope.status = {
      opened: false
    };

    scope.applyDates = function(){
      scope.datesUpdated = moment().format('x');
    };

    scope.dateRangeUpdated = function(){
      optionsUpdated({dateFilter: true});
    };

    scope.dateRangeReset = function(){
      scope.limitDate = false;
      optionsUpdated({dateFilter: false});
    };

    var currentData = [];

    scope.chartConfig = {
        series: [],
        title: {
           text: ""
        },
        loading: true,
        xAxis: {
          type: 'datetime',
          tickInterval: updateTickInterval()
        },
        yAxis: {
          title: {
            text: 'Score'
          }
        },
        options: {
          chart: {
            type: 'line'
          },
          plotOptions: {
            column: {
              stacking: 'normal'
            },
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click: pointClicked
                }
              }
            }
          },
          tooltip: {
            shared: true
          },
          yAxis: {
            title: {
              text: "Score"
            },
            max: 100,
            min: 0
          }
        }
    };

    fetch();

    scope.$watch('timegroup', function(val){
      optionsUpdated();
    });

    scope.$watch('limitDate', function(val){
      scope.limitDate = val;
    });

    function optionsUpdated(opts){
      if(currentData){
        updateData(currentData, opts);
        updateTickInterval();
      } else {
        fetch();
      }
    }

    scope.$parent.$watch('runId', function(){
      fetch();
    });

    function pointClicked(event){
      //console.log(this);
      //var grouped = _.groupBy(currentData, groupByTime);
      //console.log(grouped);
      //var pointData = getResultsForPoint(point.x);
    }

    function getResultsForPoint(point){
      return point;
    }

    function getBracketedResults(data){
      var sorted = _.sortBy(data.nugs, sortBySentimentScore);
      scope.bottomTen = sorted.slice(0,10);
      scope.topTen = sorted.slice((sorted.length - 11), sorted.length - 1).reverse();
    }

    function sortBySentimentScore(item){
      return item.sentiment;
    }

    function getAssociatedData(keywords){
      scope.keywords = keywords;
    }

    function updateSeries(allSeries){
      var min = _.min(allSeries.data, getDate);
      var max = _.max(allSeries.data, getDate);
      scope.chartConfig.series = [allSeries];
      if(allSeries.data[0]){
        scope.chartConfig.series[0].name = allSeries.data[0].tag;
        scope.chartConfig.title.text = "#" + allSeries.data[0].tag + " [ " + currentData.nugs.length + " data points ]";
      }
    }

    function getDate(item){
      return item.x;
    }

    function removeAllSeries(){
      scope.chartConfig.series = [];
    }

    function updateData(data, opts){
      scope.chartConfig.loading = false;
      scope.chart = true;

      var groups = _.groupBy(data.nugs, groupByTime);
      var points = _.map(groups, averageSentimentScorePerTimestamp);
      if(opts && opts.dateFilter){
        var dates = {
          start: new Date(scope.startDate).getTime(),
          end: new Date(scope.endDate).getTime()
        };
        var limitPointsByDate = _.partial(filterPointsByDate, dates);
        points = _.filter(points, limitPointsByDate);
      }
      var sorted = _.sortBy(points, sortByDate);
      getBracketedResults(currentData);
      getAssociatedData(data.keywords);
      if(points.length === 0){
        scope.chart = false;
      }
      updateSeries({data: sorted});
    }

    function sortByDate(item){
      return item.x;
    }

    function groupByDate(item){
      return item.date;
    }

    function filterPointsByDate(dates, point){
      console.log(point.x >= dates.start, point.y <= dates.end);
      return point.x >= dates.start && point.y <= dates.end;
    }

    function groupByTime(item){
      var date = moment(item.date).format('YYYY-MM-DDTHH:mm:SS');
      var group;
      if(scope.timegroup === 'tenminute'){
        group = moment(item.date).minutes(10).seconds(0).milliseconds(0);
      } else if(scope.timegroup === 'second'){
        group = moment(item.date);
      } else {
        group = moment(item.date).startOf(scope.timegroup);
      }
      item.modifiedDate = group.format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
      return item.modifiedDate;
    }

    function getTickInterval(){
      var timeGroup = 1000;
      switch(scope.timegroup){
        case 'second':
          timegroup = 1000;
          break;
        case 'minute':
          timegroup = 1000 * 60;
          break;
        case 'tenminute':
          timegroup = 1000 * 60 * 10;
          break;
        case 'hour':
          timegroup = 1000 * 60 * 60;
          break;
        case 'day':
          timegroup = 1000 * 60 * 60 * 24;
          break;
        default:
          timegroup = 1000;
      }

      return timegroup;
    }

    function updateTickInterval(){
      var tickInterval = getTickInterval();
      if(scope.chartConfig){
        scope.chartConfig.xAxis.tickInterval = tickInterval;
      }
    }

    function averageSentimentScorePerTimestamp(item){
      var total = 0;

      for(var i=0;i<item.length; i++){
        total += item[i].sentiment;
      }

      var average = total/item.length;
      var formatted = item[0].modifiedDate.split('T')[0];
      var date = new Date(formatted).getTime();
      var label = moment(formatted).format('ddd, MMM Do');

      return {
        x: new Date(item[0].modifiedDate).getTime(),
        y: average * 100,
        tag: item[0].tag,
        raw: item
      };

    }

    function fetch(){
      if(scope.$parent.user){
        var params = {
          run_id: scope.runid,
          auth_string: scope.$parent.user.authString
        };
        $http.post(Config.appRoot + '/search', params)
        .then(
          function(data){
            if(data.data.data.nugs.length > 0){
              currentData = data.data.data;
              updateData(data.data.data);
              updateTickInterval();
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

