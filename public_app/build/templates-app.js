angular.module('templates-app', ['about/about.tpl.html', 'home/home.tpl.html', 'hypeline/chart.tpl.html', 'hypeline/index.tpl.html', 'hypeline/run.tpl.html', 'nav/nav.tpl.html', 'user/create.tpl.html', 'user/login.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"row about\">\n" +
    "  <h1 class=\"page-header about-header\">\n" +
    "    Hypeline\n" +
    "    <small> | The basics</small>\n" +
    "  </h1>\n" +
    "  <h3><i class=\"fa fa-search\"></i> The Hunt</h3>\n" +
    "  <p>\n" +
    "    Searching is as simple as specifying a keyword (hashtag) and selecting which platforms you wish to pull data from.\n" +
    "  </p>\n" +
    "  <div class=\"full\">\n" +
    "    <img src=\"/assets/imgs/search.png\" />\n" +
    "  </div>\n" +
    "\n" +
    "  <h3><i class=\"fa fa-list\"></i> The Results</h3>\n" +
    "  <p>\n" +
    "    We'll store all your previous runs and allow you to revisit them or add more results to a specific run. <br />\n" +
    "    (Coming soon!) The ability to compare separate runs on the same graph.\n" +
    "  </p>\n" +
    "  <div class=\"half\">\n" +
    "    <img src=\"/assets/imgs/review.png\" />\n" +
    "  </div>\n" +
    "\n" +
    "  <h3><i class=\"fa fa-bar-chart\"></i> The Graph</h3>\n" +
    "  <p>\n" +
    "    View your results on a timeline. This timeline is configurable by various time grouping to truly analyze a trend.\n" +
    "  </p>\n" +
    "  <p class=\"full\">\n" +
    "     <img src=\"/assets/imgs/graph.png\" />\n" +
    "  </p>\n" +
    "\n" +
    "  <h3><i class=\"fa fa-level-down\"></i> The Deep Dive</h3>\n" +
    "  <p>\n" +
    "    We'll also show you the top and bottom results for a given run to make sure we're doing our job!\n" +
    "  </p>\n" +
    "  <p class=\"full\">\n" +
    "    <img src=\"/assets/imgs/results.png\" />\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "\n" +
    "  <h1 class=\"page-header about-header\">\n" +
    "    Any questions?\n" +
    "  </h1>\n" +
    "  <p>\n" +
    "    We'd be glad to talk! <br />\n" +
    "    Drop us a line at <a href=\"mailto:hypelineco@gmail.com\">hypelineco@gmail.com</a>. <br />\n" +
    "    If you'd like to see a working demo, <a href=\"/#/demo\">we've got that too</a></p>\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "  <img src=\"/assets/imgs/logo_large.png\" />\n" +
    "\n" +
    "  <p class=\"lead\">\n" +
    "    Here at Hypeline, we have one simple mission: analyze and trend the social voice. Whether you're looking to measure the effectiveness of a\n" +
    "    social marketing campaign, gauging public sentiment of your favorite political candidate, or simply keeping up on the tone of your sports team,\n" +
    "    we're here to help.\n" +
    "  </p>\n" +
    "\n" +
    "  <div class=\"btn-group\">\n" +
    "    <a href=\"/#/demo\" class=\"btn btn-large btn-primary cta\">\n" +
    "      <i class=\"fa fa-heart\"></i>\n" +
    "      See us in action\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"marketing section\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-thumbs-up\"></i> Data</h4>\n" +
    "      <p>\n" +
    "        Easy data gathering from multiple platforms.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-magic\"></i> Complete Analysis</h4>\n" +
    "      <p>\n" +
    "        Superb sentiment analysis from our friends at <a href=\"https://indico.io/\">Indico.io</a> (they're seriously awesome)!\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-bar-chart\"></i> Real time trending</h4>\n" +
    "      <p>\n" +
    "        Trend results with data grouping of your choosing.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"section\">\n" +
    "  <p>\n" +
    "    We providing simple tools to access and gather tailored information from various social media networks and analyze the sentiment of each and\n" +
    "    every data point to give you the insight and trend curve to let you know exactly what the public sentiment of your query is. Better yet, you can\n" +
    "    trend that data by user-specified time groupings. <a href=\"/#/demo\">Go on! Have some fun!</a>\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    Right now, we're in an extremely limited beta. If you'd like an invite, send an email to <a href=\"mailto:hypelineco@gmail.com\">hypelineco@gmail.com</a>\n" +
    "    and let us know! We'd be interested to know what Hypeline can provide for you.\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("hypeline/chart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hypeline/chart.tpl.html",
    "<div class=\"row\">\n" +
    "  <div class=\"options-container clearfix\">\n" +
    "    <div class=\"options-toggle\">\n" +
    "      <button ng-click=\"toggleOptions()\">[ <i class=\"fa fa-gear\"></i> Chart Options - {{chartOptions ? 'Hide' : 'Show'}} ]</button>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper clearfix\" ng-show=\"chartOptions\">\n" +
    "      <div class=\"col-xs-12 section\">\n" +
    "        <ul class=\"input-group time-grouping\">\n" +
    "          <li>\n" +
    "            <label for=\"second\" class=\"label label-default\">Seconds</label>\n" +
    "            <input type=\"radio\" value=\"second\" id=\"second\" ng-model=\"timegroup\"/>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <label for=\"minute\" class=\"label label-default\">Minutes</label>\n" +
    "            <input type=\"radio\" value=\"minute\" id=\"minute\" ng-model=\"timegroup\"/>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <label for=\"hour\" class=\"label label-default\">Hours</label>\n" +
    "            <input type=\"radio\" value=\"hour\" id=\"hour\" ng-model=\"timegroup\"/>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <label for=\"day\" class=\"label label-default\">Days</label>\n" +
    "            <input type=\"radio\" value=\"day\" id=\"day\" ng-model=\"timegroup\"/>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-12 section\">\n" +
    "        <label for=\"limit-date\" class=\"label label-default\">Limit results by date</label>\n" +
    "        <input type=\"checkbox\" ng-model=\"limitDate\" />\n" +
    "        <div class=\"limit-dates\" ng-show=\"limitDate\">\n" +
    "          <div class=\"chart-options\">\n" +
    "            <div class=\"calendar-container\">\n" +
    "              <label for=\"startDate\" class=\"label label-default\">Start Date</label>\n" +
    "              <p class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"startDate\" is-open=\"status.opened\" max-date=\"maxDate\" datepicker-options=\"dateOptions\" ng-required=\"true\" show-weeks=\"false\" close-text=\"Close\" close-on-date-selection=\"false\" show-button-bar=\"false\" ng-click=\"open($event)\" id=\"startDate\" required />\n" +
    "                  <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"fa fa-calendar\"></i></button>\n" +
    "                  </span>\n" +
    "              </p>\n" +
    "              <label for=\"endDate\" class=\"label label-default\">End Date</label>\n" +
    "              <p class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"endDate\" is-open=\"status.opened\" max-date=\"maxDate\" datepicker-options=\"dateOptions\" ng-required=\"true\" show-weeks=\"false\" close-text=\"Close\" close-on-date-selection=\"false\" show-button-bar=\"false\" ng-click=\"open($event)\" id=\"endDate\" required />\n" +
    "                  <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"fa fa-calendar\"></i></button>\n" +
    "                  </span>\n" +
    "              </p>\n" +
    "              <div class=\"apply\">\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"dateRangeUpdated()\">Submit</button>\n" +
    "                <button class=\"btn btn-default\" ng-click=\"dateRangeReset()\">Reset</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-12\">\n" +
    "    <div ng-if=\"chart\" class=\"chart\">\n" +
    "        <highchart id=\"chart-{{id}}\" config=\"chartConfig\"></highchart>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!chart\" class=\"\">\n" +
    "      <p>No data for this time range</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"row\" ng-if=\"chart\">\n" +
    "  <div class=\"col-xs-4 chart-data\">\n" +
    "    <h4 class=\"sub-heading\">Top Ten Results</h4>\n" +
    "    <ul class=\"terms\">\n" +
    "      <li ng-repeat=\"term in topTen\" class=\"term\">\n" +
    "        <ul class=\"details\">\n" +
    "          <li class=\"detail\"><strong>Origin:</strong><br /> {{term.origin}}</li>\n" +
    "          <li class=\"detail\"><strong>Score:</strong><br /> {{term.sentiment}}</li>\n" +
    "          <li class=\"detail\"><strong>Detail:</strong><br /> {{term.text}}</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4 chart-data\">\n" +
    "    <h4 class=\"sub-heading\">Bottom Ten Results</h4>\n" +
    "    <ul class=\"terms\">\n" +
    "      <li ng-repeat=\"term in bottomTen\" class=\"term\">\n" +
    "        <ul class=\"details\">\n" +
    "          <li class=\"detail\"><strong>Origin:</strong><br /> {{term.origin}}</li>\n" +
    "          <li class=\"detail\"><strong>Score:</strong><br /> {{term.sentiment}}</li>\n" +
    "          <li class=\"detail\"><strong>Detail:</strong><br /> {{term.text}}</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4 chart-data\">\n" +
    "    <h4 class=\"sub-heading\">Associated Data</h4>\n" +
    "    <ul class=\"terms\">\n" +
    "      <li ng-repeat=\"keyword in keywords\" class=\"term\">\n" +
    "        <ul class=\"details\">\n" +
    "          <li class=\"detail\"><strong>Keyword:</strong><br /> {{keyword.keyword}}</li>\n" +
    "          <li class=\"detail\"><strong>Relevancy Score:</strong><br /> {{keyword.score}}</li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("hypeline/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hypeline/index.tpl.html",
    "<div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-3 app-menu\">\n" +
    "      <ul class=\"menu actions\">\n" +
    "        <li><a href=\"#/app/run\"><i class=\"fa fa-plus-circle\"></i> Create new</a></li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <div class=\"active-runs\">\n" +
    "        <p ng-if=\"run.message\" class=\"alert alert-info\">{{run.message}}</p>\n" +
    "        <div ng-if=\"runLoading\">Loading...</div>\n" +
    "        <div class=\"runs-disabled\" ng-if=\"loadingRun && !runLoading\">\n" +
    "          <p>Retrieving...</p>\n" +
    "        </div>\n" +
    "        <ul class=\"menu runs\" ng-if=\"!runLoading\">\n" +
    "          <li ng-repeat=\"run in runs\"  ng-mouseenter=\"showOptions(run)\" ng-mouseleave=\"hideOptions(run)\">\n" +
    "            <div class=\"loading\" ng-if=\"loadingRun == run.runId\"><i class=\"fa fa-cog fa-spin\"></i></div>\n" +
    "            <span class=\"run\" ng-click=\"getRun(run)\">#{{run.tag}} :\n" +
    "              <span class=\"small\">[{{run.runDate}}]</span>\n" +
    "\n" +
    "            </span>\n" +
    "            <span class=\"options\" ng-if=\"!demo && run.showOptions\">\n" +
    "              <i class=\"fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" ng-click=\"editRun(run)\"></i>\n" +
    "              <i class=\"fa fa-trash\" ng-click=\"deleteRun(run)\"></i>\n" +
    "            </span>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-9 action\">\n" +
    "      <div ng-if=\"section == 'run'\" new-run class=\"new-run\"></div>\n" +
    "      <div ng-if=\"section == 'results'\">\n" +
    "        <div ng-if=\"noDataError\" class=\"alert alert-info\">No data!</div>\n" +
    "        <div ng-if=\"!noDataError\" class=\"row chart-container hypeline-results\">\n" +
    "          <results-chart type=\"chart\" name=\"results\" runId=\"{{runId}}\"></results-chart>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("hypeline/run.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hypeline/run.tpl.html",
    "<div class=\"loading\" ng-show=\"loadEdit\">Loading run...</div>\n" +
    "<div ng-show=\"runError\">\n" +
    "  <p class=\"alert alert-danger\">{{runError}}</p>\n" +
    "</div>\n" +
    "<ng-form novalidate role=\"form\" name=\"entryPoint\" ng-show=\"newRun && !loadEdit\" class=\"new-run-form\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h5 class=\"step description sub-heading\">What do you want to research? A single keyword works best.</h5>\n" +
    "        <p class=\"input-group\">\n" +
    "            <input class=\"form-control\" type=\"text\" placeholder=\"Tag to search\" ng-model=\"tag\" ng-disabled=\"editExistingRun\" required />\n" +
    "        </p>\n" +
    "        <p ng-if=\"inputError\" class=\"alert alert-danger\" ng-bind-html=\"inputError\"></p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h5 class=\"step description sub-heading\">Which platform would you like to get results from?</h5>\n" +
    "        <ul class=\"input-group platforms\">\n" +
    "            <li>\n" +
    "              <label for=\"twitter\" class=\"label label-default\"><img src=\"/assets/imgs/twitter.png\" /></label>\n" +
    "              <input type=\"checkbox\" value=\"twitter\" id=\"twitter\" ng-model=\"platforms.twitter\" ng-disabled=\"editExistingRun\"/>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <label for=\"tumblr\" class=\"label label-default\"><img src=\"/assets/imgs/tumblr.png\" /></label>\n" +
    "              <input type=\"checkbox\" value=\"tumblr\" id=\"tumblr\" ng-model=\"platforms.tumblr\" ng-disabled=\"editExistingRun\"/>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <label for=\"insta\" class=\"label label-default\"><img src=\"/assets/imgs/instagram.png\" /></label>\n" +
    "              <input type=\"checkbox\" value=\"instagram\" id=\"insta\" ng-model=\"platforms.instagram\" ng-disabled=\"editExistingRun\"/>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <label for=\"gplus\" class=\"label label-default\"><img src=\"/assets/imgs/gplus.jpg\" /></label>\n" +
    "              <input type=\"checkbox\" value=\"gplus\" id=\"gplus\" ng-model=\"platforms.gplus\" ng-disabled=\"editExistingRun\"/>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <label for=\"vine\" class=\"label label-default\"><img src=\"/assets/imgs/vine.jpg\" /></label>\n" +
    "              <input type=\"checkbox\" value=\"vine\" id=\"vine\" ng-model=\"platforms.vine\" ng-disabled=\"editExistingRun\"/>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <div class=\"col-xs-12 input-group\">\n" +
    "          <h5 class=\"step description sub-heading\">Continually fetch results?</h5>\n" +
    "          <input type=\"checkbox\" value=\"true\" id=\"scheduled\" ng-model=\"scheduled\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-12 submit-box\">\n" +
    "        <p class=\"input-group\">\n" +
    "            <button ng-if=\"!editExistingRun\" type=\"submit\" value=\"submit\" class=\"btn btn-primary\" ng-disabled=\"entryPoint.$invalid || demo\" ng-click=\"go()\">{{ demo ? \"Disabled for demo\" : \"Go!\"}}</button>\n" +
    "            <button ng-if=\"editExistingRun\" type=\"submit\" value=\"submit\" class=\"btn btn-primary\" ng-disabled=\"entryPoint.$invalid || demo\" ng-click=\"go()\">{{ demo ? \"Disabled for demo\" : \"Update Run\"}}</button>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("nav/nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("nav/nav.tpl.html",
    "<div class=\"navbar navbar-default\">\n" +
    "  <div class=\"navbar-header\">\n" +
    "    <button type=\"button\" class=\"navbar-toggle\" ng-init=\"menuCollapsed = true\"\n" +
    "      ng-click=\"menuCollapsed = ! menuCollapsed\">\n" +
    "      <span class=\"sr-only\">Toggle navigation</span>\n" +
    "      <span class=\"icon-bar\"></span>\n" +
    "      <span class=\"icon-bar\"></span>\n" +
    "      <span class=\"icon-bar\"></span>\n" +
    "    </button>\n" +
    "    <div class=\"navbar-brand clearfix\">\n" +
    "        <p>\n" +
    "          <a href=\"/\"><img src=\"/assets/imgs/logo_small.jpg\" /></a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div class=\"navbar-info clearfix\">\n" +
    "      <ul class=\"list-inline\">\n" +
    "        <li>\n" +
    "          <a href=\"#/about\">Info</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"nav navbar-nav navbar-right\">\n" +
    "    <p>\n" +
    "      <span ng-if=\"user\">\n" +
    "        <a href=\"#/app/\" class=\"btn btn-success\">App</a>\n" +
    "        <a href=\"/\" ng-click=\"logout()\" href=\"#/user/logout\" class=\"btn\">Logout</a>\n" +
    "      </span>\n" +
    "      <span ng-if=\"!user\">\n" +
    "        <a href=\"#/user/create\" class=\"btn btn-primary\">Sign Up</a>\n" +
    "        <a href=\"#/user/login\" class=\"btn\">Log In</a>\n" +
    "      </span>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "  <div class=\"collapse navbar-collapse\" collapse=\"menuCollapsed\"></div>\n" +
    "</div>\n" +
    "<div class=\"indico clearfix\">\n" +
    "  <p>\n" +
    "    <a target=\"_blank\" href=\"http://indico.io\">Powered By <img src=\"/assets/imgs/indico.png\" /></a>\n" +
    "  </p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("user/create.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/create.tpl.html",
    "<div class=\"container\">\n" +
    "    <div ng-if=\"error\" class=\"alert alert-danger\">{{error}}</div>\n" +
    "    <form role=\"form\" ng-submit=\"createUser()\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-12 col-sm-6 col-sm-offset-3\">\n" +
    "            <h2>Hello!</h2>\n" +
    "            <p>We are currently in private beta. If you would like to help us beta test, please send an email to <a href=\"mailto:hypelineco@gmail.com\">hypelineco@gmail.com</a> and we'll get you on the list. Thank you.</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6 col-sm-3 col-sm-offset-3 form-group\">\n" +
    "                <label for=\"firstName\">First Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"firstName\" ng-model=\"user.firstName\" />\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-12 col-sm-3 form-group\">\n" +
    "                <label for=\"lastName\">Last Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"lastName\" ng-model=\"user.lastName\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 form-group\">\n" +
    "                <label for=\"email\">Email</label>\n" +
    "                <input type=\"email\" class=\"form-control\" id=\"email\" ng-model=\"user.email\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3  form-group\">\n" +
    "                <label for=\"userName\">User Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"userName\" ng-model=\"user.userName\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3  form-group\">\n" +
    "                <label for=\"password\">Password</label>\n" +
    "                <input type=\"password\" class=\"form-control\" id=\"password\" ng-model=\"user.password\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3  form-group\">\n" +
    "                <label for=\"token\">Beta Token</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"token\" ng-model=\"user.token\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 \">\n" +
    "                <input class=\"btn btn-primary\" type=\"submit\" value=\"Create User\" id=\"createUser\"></input>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("user/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/login.tpl.html",
    "<div class=\"container\">\n" +
    "    <form role=\"form\" ng-submit=\"login()\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 form-group\">\n" +
    "                <div ng-if=\"error\" class=\"alert alert-danger\">{{error}}</div>\n" +
    "                <div ng-if=\"messages\" class=\"alert alert-info\" ng-bind-html=\"messages\"></div>\n" +
    "          </div>\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 form-group\">\n" +
    "                <label for=\"userName\">Email</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"userName\" ng-model=\"user.userName\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 form-group\">\n" +
    "                <label for=\"password\">Password</label>\n" +
    "                <input type=\"password\" class=\"form-control\" id=\"password\" ng-model=\"user.password\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 form-group\">\n" +
    "                <input ng-if=\"!loading\" class=\"btn btn-primary\" type=\"submit\" value=\"Login\" id=\"login\" ng-diabled=\"!loading\"></input>\n" +
    "                <p ng-if=\"loading\">Loading...</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "");
}]);
