angular.module('templates-app', ['about/about.tpl.html', 'home/home.tpl.html', 'hypeline/chart.tpl.html', 'hypeline/index.tpl.html', 'nav/nav.tpl.html', 'user/create.tpl.html', 'user/login.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"row\">\n" +
    "  <h1 class=\"page-header about-header\">\n" +
    "    Hypeline\n" +
    "    <small>The basics</small>\n" +
    "  </h1>\n" +
    "  <p>\n" +
    "    We provide you with as much social sentiment as you need. Take what you want from it!\n" +
    "  </p>\n" +
    "\n" +
    "  <div>\n" +
    "    <img src=\"/assets/imgs/top_app.png\" />\n" +
    "  </div>\n" +
    "  \n" +
    "  <h3>Social sentiment</h3>\n" +
    "\n" +
    "  <p>\n" +
    "    As a business owner active on social media, you are likely tracking the number social mentions about your brand. But are these messages positive or negative about your brand?\n" +
    "    <br/>\n" +
    "    This is Social Sentiment.\n" +
    "    <img src=\"/assets/imgs/graph.png\" />\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "\n" +
    "  <h1 class=\"page-header about-header\">\n" +
    "    Who should use this?\n" +
    "  </h1>\n" +
    "  <p>\n" +
    "    Business owners who are active social media users and want to: \n" +
    "      <ul>\n" +
    "        <li>improve their social media marketing</li>\n" +
    "        <li>identify current and potential trends on social media</li>\n" +
    "        <li>understand how your customers, fans and followers  feel about your brand</li>\n" +
    "      </ul>\n" +
    "  </p>\n" +
    "\n" +
    "\n" +
    "  <h1 class=\"page-header about-header\" id=\"pricing\">\n" +
    "    <a id=\"pricing-anchor\">Pricing<a>\n" +
    "    <small>Affordable for any business</small>\n" +
    "  </h1>\n" +
    "  <p>\n" +
    "    $67 / per 3 users\n" +
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
    "    Semiotics irony tofu ugh put a bird on it letterpress ennui, gluten-free helvetica biodiesel hashtag squid. Yr bespoke DIY poutine banh mi williamsburg, normcore try-hard trust fund church-key shoreditch tumblr. Squid actually lo-fi, YOLO locavore umami blog heirloom microdosing fanny pack twee banh mi waistcoat occupy.\n" +
    "  </p>\n" +
    "\n" +
    "  <div class=\"btn-group\">\n" +
    "    <a href=\"/#/about\" class=\"btn btn-large btn-default\">\n" +
    "      <i class=\"fa fa-question-circle\"></i>\n" +
    "      What we do\n" +
    "    </a>\n" +
    "    <a href=\"/#/app\" class=\"btn btn-large btn-primary\">\n" +
    "      <i class=\"fa fa-rocket\"></i>\n" +
    "      Get Started\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"marketing\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-thumbs-up\"></i> Good to Go!</h4>\n" +
    "      <p>\n" +
    "        Bullet point for stuff.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-magic\"></i> Complete Analysis</h4>\n" +
    "      <p>\n" +
    "        Bullet point for more stuff.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-retweet\"></i> Real time trending</h4>\n" +
    "      <p>\n" +
    "        So much awesome. So little time.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-star\"></i> And dinosaurs</h4>\n" +
    "      <p>\n" +
    "        This is pretty much the best thing ever.\n" +
    "        <a href=\"http://angularjs.org\">More &raquo;</a>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-bar-chart\"></i> Less suck. More stats</h4>\n" +
    "      <p>\n" +
    "        You want stats? We've got stats/\n" +
    "        <a href=\"http://lesscss.org\">More &raquo;</a>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-6 col-md-4\">\n" +
    "      <h4><i class=\"fa fa-usd\"></i> Give us all your money</h4>\n" +
    "      <p>\n" +
    "        I'm about to retire.\n" +
    "        <a href=\"http://joshdmiller.github.com/angular-placeholders\">\n" +
    "          More &raquo;\n" +
    "        </a>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
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
    "<div ng-controller=\"HypelineCtrl\">\n" +
    "  <div class=\"row\">\n" +
    "      <div class=\"col-xs-8 new-run\">\n" +
    "        <div class=\"form-control-group toggle-input\">\n" +
    "          <button ng-show=\"!newRun\" class=\"form-control btn btn-success\" ng-click=\"openNewRun(true)\">Show</button>\n" +
    "          <button ng-show=\"newRun\" class=\"form-control btn btn-info\" ng-click=\"openNewRun(false)\">Hide</button>\n" +
    "        </div>\n" +
    "        <ng-form novalidate role=\"form\" name=\"entryPoint\" ng-show=\"newRun\" class=\"new-run-form\">\n" +
    "            <div class=\"col-xs-12\">\n" +
    "<!--                 <label for=\"tags\" class=\"label label-default\">Tag</label> -->\n" +
    "                <h4 class=\"step\">Step 1:</h4>\n" +
    "                <h5 class=\"step description sub-heading\">What do you want to research? A single keyword works best.</h5>\n" +
    "                <p class=\"input-group\">\n" +
    "                    <input class=\"form-control\" type=\"text\" placeholder=\"Tag to search\" ng-model=\"tag\" required />\n" +
    "                </p>\n" +
    "                <p ng-if=\"inputError\" class=\"alert alert-danger\" ng-bind-html=\"inputError\"></p>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-12\">\n" +
    "<!--                 <label for=\"endDate\" class=\"label label-default\">Platforms</label> -->\n" +
    "                <h4 class=\"step\">Step 2:</h4>\n" +
    "                <h5 class=\"step description sub-heading\">Which platform would you like to get results from?</h5>\n" +
    "                <ul class=\"input-group platforms\">\n" +
    "                    <li>\n" +
    "                      <label for=\"twitter\" class=\"label label-default\"><img src=\"/assets/imgs/twitter.png\" /></label>\n" +
    "                      <input type=\"checkbox\" value=\"twitter\" id=\"twitter\" ng-model=\"platforms.twitter\"/>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                      <label for=\"tumblr\" class=\"label label-default\"><img src=\"/assets/imgs/tumblr.png\" /></label>\n" +
    "                      <input type=\"checkbox\" value=\"tumblr\" id=\"tumblr\" ng-model=\"platforms.tumblr\"/>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                      <label for=\"insta\" class=\"label label-default\"><img src=\"/assets/imgs/instagram.png\" /></label>\n" +
    "                      <input type=\"checkbox\" value=\"instagram\" id=\"insta\" ng-model=\"platforms.instagram\"/>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                      <label for=\"gplus\" class=\"label label-default\"><img src=\"/assets/imgs/gplus.jpg\" /></label>\n" +
    "                      <input type=\"checkbox\" value=\"gplus\" id=\"gplus\" ng-model=\"platforms.gplus\"/>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                      <label for=\"vine\" class=\"label label-default\"><img src=\"/assets/imgs/vine.jpg\" /></label>\n" +
    "                      <input type=\"checkbox\" value=\"vine\" id=\"vine\" ng-model=\"platforms.vine\"/>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-12\">\n" +
    "                <h4 class=\"step\">Step 3:</h4>\n" +
    "                <h5 class=\"step description sub-heading\">Let the magic happen!</h5>\n" +
    "                <p class=\"input-group\">\n" +
    "                    <button type=\"submit\" value=\"submit\" class=\"btn btn-primary\" ng-disabled=\"entryPoint.$invalid\" ng-click=\"go()\">Go!</button>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-4\">\n" +
    "        <h4 class=\"step\">Prior Results</h4>\n" +
    "        <h5 class=\"step description\">Click to view</h5>\n" +
    "        <p ng-if=\"run.message\" class=\"alert alert-info\">{{run.message}}</p>\n" +
    "        <div class=\"panel panel-default past-runs\">\n" +
    "          <div ng-if=\"runLoading\">Loading...</div>\n" +
    "          <ul class=\"runs\" ng-if=\"!runLoading\">\n" +
    "            <li ng-repeat=\"run in runs\"  ng-mouseenter=\"showOptions(run)\" ng-mouseleave=\"hideOptions(run)\" ng-click=\"getRun(run)\">\n" +
    "              <span class=\"run\">#{{run.tag}} :\n" +
    "                <span class=\"small\">[{{run.runDate}}]</span>\n" +
    "<!--                 <span ng-if=\"run.showOptions\" class=\"options\">OPTS</span> -->\n" +
    "                <span class=\"options\">\n" +
    "                  <i class=\"fa fa-plus-circle\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Get more results\" ng-click=\"getMore(run)\"></i>\n" +
    "                  <i class=\"fa fa-trash\" ng-click=\"deleteRun(run)\"></i>\n" +
    "                </span>\n" +
    "\n" +
    "              </span>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"row chart-container hypeline-results\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <div ng-if=\"noDataError\" class=\"alert alert-info\"></div>\n" +
    "      <results-chart ng-if=\"!noDataError\" type=\"chart\" name=\"results\" runId=\"{{runId}}\"></results-chart>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
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
    "          <a href=\"/\"><img src=\"/assets/imgs/hypeline_logo_small.png\" /></a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div class=\"navbar-info clearfix\">\n" +
    "      <ul class=\"list-inline\">\n" +
    "        <li>\n" +
    "          <a href=\"#/about\">Info</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"#/about#pricing\">Pricing</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-if=\"user\" class=\"nav navbar-nav navbar-right\">\n" +
    "    <p>\n" +
    "      <a href=\"#/app\" class=\"btn btn-success\">App</a>\n" +
    "      <a href=\"#/app\" ng-click=\"logout()\" href=\"#/user/logout\" class=\"btn\">Logout</a>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "  <div ng-if=\"!user\" class=\"nav navbar-nav navbar-right\">\n" +
    "    <p>\n" +
    "      <a href=\"#/user/create\" class=\"btn btn-primary\">Sign Up</a>\n" +
    "      <a href=\"#/user/login\" class=\"btn\">Log In</a>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "  <div class=\"collapse navbar-collapse\" collapse=\"menuCollapsed\"></div>\n" +
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
    "            <p>We are currently in private beta. If you would like to help us beta test, please send an email to <a href=\"mailto:beta@hypelineapp.co\">beta@hypelineapp.co</a> and we'll get you on the list. Thank you.</p>\n" +
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
