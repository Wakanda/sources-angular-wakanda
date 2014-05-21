'use strict';

angular.module('angularWakandaFrontApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'wakConnectorModule'
])
        .config(['$routeProvider', function($routeProvider) {
            //there maybe other ways or even services (ones that handles resolve for all routes),
            //for the moment, this should fit in your bootstrap (or be adaptable), whatever way you did it
            //see more on README.md
            var routeResolver = {
              app: ['wakConnectorService', function(wakConnectorService) {
                  return wakConnectorService.init();
                }]
            };
            $routeProvider
                    .when('/', {
                      templateUrl: 'views/main.html',
                      controller: 'MainCtrl'
                    })
                    .when('/about', {
                      templateUrl: 'views/about.html',
                      controller: 'AboutCtrl'
                    })
                    .when('/connect1', {
                      templateUrl: 'views/connect1.html',
                      controller: 'Connect1Ctrl'
                    })
                    .when('/retrieve-infos', {
                      templateUrl: 'views/retrieve-infos.html',
                      controller: 'RetrieveInfosCtrl',
                      resolve: routeResolver
                    })
                    .when('/example1', {
                      templateUrl: 'views/example1.html',
                      controller: 'Example1Ctrl',
                      resolve: routeResolver
                    })
                    .when('/example2', {
                      templateUrl: 'views/example2.html',
                      controller: 'Example2Ctrl',
                      resolve: routeResolver
                    })
                    .when('/example3', {
                      templateUrl: 'views/example3.html',
                      controller: 'Example3Ctrl',
                      resolve: routeResolver
                    })
                    .when('/test1', {
                      templateUrl: 'views/test1.html',
                      controller: 'Test1Ctrl',
                      resolve: routeResolver
                    })
                    .when('/test2', {
                      templateUrl: 'views/test2.html',
                      controller: 'Test2Ctrl',
                      resolve: routeResolver
                    })
                    .when('/test3', {
                      templateUrl: 'views/test3.html',
                      controller: 'Test3Ctrl',
                      resolve: routeResolver
                    })
                    .when('/bug-test1', {
                      templateUrl: 'views/bug-test1.html',
                      controller: 'BugTest1Ctrl',
                      resolve: routeResolver
                    })
                    .when('/bug-test2/:employeeId', {
                      templateUrl: 'views/bug-test2.html',
                      controller: 'BugTest2Ctrl',
                      resolve: routeResolver
                    })
                    .when('/bug-test2', {
                      templateUrl: 'views/bug-test2.html',
                      controller: 'BugTest2Ctrl',
                      resolve: routeResolver
                    })
                    .when('/basics1', {
                      templateUrl: 'views/basics1.html',
                      controller: 'Basics1Ctrl',
                      resolve: routeResolver
                    })
                    .when('/basics2', {
                      templateUrl: 'views/basics2.html',
                      controller: 'Basics2Ctrl',
                      resolve: routeResolver
                    })
                    .otherwise({
                      redirectTo: '/'
                    });
          }]);
