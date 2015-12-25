angular.module( 'hypeLine.hypeline', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'hypeline', {
    url: '/app/:section',
    views: {
      "main": {
        controller: 'HypelineCtrl',
        templateUrl: 'hypeline/index.tpl.html'
      }
    }
  })
  .state( 'hypeline.edit', {
    url: '^/app/:section/:id',
    views: {
      "main": {
        controller: 'HypelineCtrl',
        templateUrl: 'hypeline/index.tpl.html'
      }
    }
  })
  .state( 'demo' , {
    url: '/demo',
    views: {
      "main": {
        controller: function($scope) {
          $scope.demoPage = true;
        },
        templateUrl: 'hypeline/index.tpl.html'
      }
    }
  });
})

.controller( 'HypelineCtrl', function HypelineController( $location, $stateParams, $scope, $http, Config, $rootScope, AuthService, $sanitize, DataStore ) {

  $scope.defaultDates = function() {
    $scope.endDate = new Date();
    $scope.startDate = new Date(moment().startOf('month').utcOffset(0).format('YYYY-MM-DD HH:MM:SS Z'));
    $scope.tag = null;
    $scope.datesUpdated = moment().format('x');
    $scope.scheduled = false;
  };

  function setDefaultValues(){
    $scope.platforms = {};
    $scope.defaultDates();
    $scope.inputError = false;
    $scope.run = {
      message: false
    };
    $scope.editExistingRun = false;
  }

  $scope.demo = $scope.demoPage || false;
  setDefaultValues();
  resolveUrl();

  $scope.$on('$stateChangeSuccess', function(state){
    setDefaultValues();
    resolveUrl();
  });

  function resolveUrl(){
    if($stateParams.section === "run" && $stateParams.id){
      setScopeSection();
      getUserRun();
    } else if($stateParams.section === "run" || $stateParams.section === "results") {
      setDefaultValues();
      setScopeSection();
    } else {
      $location.path('app/results');
    }
  }

  function setScopeSection(){
    $scope.section = $stateParams.section;
  }

  $scope.newRun = true;
  $scope.openNewRun = function(val){
    $scope.newRun = val;
  };

  var setUser = function(){
    $scope.user = AuthService.get();
    if($scope.user || $scope.demo){
      checkUserRuns();
    } else {
      if(!$scope.demo){
        AuthService.eject();
      }
    }
  };

  if($scope.user || $scope.demo){
    checkUserRuns();
  } else {
    setUser();
  }

  $scope.clearLoading = function(){
    $scope.loadingRun = false;
  };

  $rootScope.$on("user:updated",setUser);

  function checkUserRuns(){
    $scope.runs = DataStore.get('userRuns', false);
    if(_.isEmpty($scope.runs)){
      $scope.runs = [];
      getUserRuns();
    }
  }

  function getUserRun(){
      $scope.loadEdit = true;
      var params = {};
      params.user_id = $scope.user.userId;
      params.auth_string = $scope.user.authString;
      params.run_id = $stateParams.id;
      var url = Config.appRoot + '/run/one';
      $http.post(url, params)
      .then(
        function(data){
          $scope.loadEdit = false;
          displayRun(data.data.result);
        },
        function(data){
          $scope.loadEdit = false;
          console.log("Error fetching run", data, data.data.error);
          $scope.runError = data.data.error;
        }
      );
  }

  function displayRun(run){
    explodePlatforms(run.media);
    $scope.tag = run.keyword;
    $scope.editExistingRun = true;
    $scope.scheduled = !run.one_time;
  }

  function explodePlatforms(media){
    $scope.platforms = {};
    _.each(media, setPlatformActive);
  }

  function setPlatformActive(platform){
    $scope.platforms[platform] = true;
  }

  function getUserRuns(){
    $scope.runs = [];
    $scope.runLoading = true;
    var params = {};
    if(!$scope.demo){
      params.user_id = $scope.user.userId;
      params.auth_string = $scope.user.authString;
    } else {
      params.user_id = '2iTohWzF9SOKMIJ0B3gnuX';
      params.demo = $scope.demo;
    }
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
    if(run){
      if($scope.section !== "results"){
        DataStore.set('storedRun', run.runId);
        $location.path('app/results');
      } else {
        $scope.loadingRun = run.runId;
        $scope.hideOptions(run);
        $scope.runId = run.runId;
      }
    }
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

  $scope.getMore = function(run){
    $scope.go(run);
  };

  $scope.editRun = function(run){
    var url = 'app/run/' + run.runId;
    $location.path(url);
  };

  function parseUserRuns(data){
    data.forEach(function(run){
      $scope.runs.push({
        tag: run.keyword.trim(),
        startDate: run.hasOwnProperty('start_date') ? moment(run.start_date).format('MM-DD-YYYY') : '?',
        endDate: run.hasOwnProperty('end_date') ? moment(run.end_date).format('MM-DD-YYYY') : '?',
        runId: run.run_id,
        runDate: moment(run.createdAt).format('MM-DD-YYYY'),
        origin: run.media.join(',')
      });
    });
    DataStore.set('userRuns', $scope.runs);
    if($scope.section !== "run"){
      var storedRun = DataStore.get('storedRun');

      if(storedRun){
        $scope.getRun(_.findWhere($scope.runs, {runId: storedRun}));
      } else {
        $scope.getRun(_.last($scope.runs));
      }

    }
  }

  $scope.go = function(run){
    getPlatforms();
    if(!$scope.user && !$scope.demo){
      setUser();
      if($scope.user){
        go(run);
      } else {
        $location.path('user/login');
      }
    } else {
      go(run);
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

    function go(run){
      if($scope.user || $scope.demo){
        $scope.loading = true;
        var platforms = getPlatforms();
        var params = {};
        if($scope.demo){
          params.user_id = '2iTohWzF9SOKMIJ0B3gnuX';
          params.keyword = $scope.tag;
          params.start_date = $scope.startDate;
          params.end_date = $scope.endDate;
          params.demo = $scope.demo;
          params.origin = platforms;
        } else {
          params.origin = platforms;
          params.user_id = $scope.user.userId;
          params.keyword = $scope.tag;
          params.start_date = $scope.startDate;
          params.end_date = $scope.endDate;
          params.auth_string = $scope.user.authString;
          params.one_time = !$scope.scheduled;
        }
        if(run){
          params.run_id = run.runId;
          params.origin = run.origin;
          params.keyword = run.tag;
        }
        var url = Config.appRoot + '/analyze';
        $http.post(url, params)
        .then(
          function(data){
            if(run){
              $scope.$broadcast('results:updated');
            }
            console.log(data);
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
            text: 'Positivity'
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

    scope.$parent.$watch('runId', function(runId){
      if(runId){
        fetch();
      }
    });

    scope.$parent.$on('results:updated', function(){
      console.log('more results on the way');
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
      if(scope.$parent.user || scope.$parent.demo){
        var params = {
          run_id: scope.runid
        };
        if(scope.$parent.demo){
          params.demo = scope.$parent.demo;
        } else {
          params.auth_string = scope.$parent.user.authString;
        }
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
            scope.$parent.clearLoading();
          },
          function(data){
            $log.error('Error fetching', data);
            scope.chartConfig.loading = "Error fetching data";
            scope.$parent.clearLoading();
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

.directive('newRun', function(){
  return {
    templateUrl: 'hypeline/run.tpl.html',
    controller: 'HypelineCtrl'
  };
})

;

