'use strict';

angular.module('angularWakandaFrontApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'wakanda',
  'unitTestsHelpersModule',
  'rootScopeSafeApplyModule'
])
        .config(['$routeProvider', function($routeProvider) {
            //there maybe other ways or even services (ones that handles resolve for all routes),
            //for the moment, this should fit in your bootstrap (or be adaptable), whatever way you did it
            //see more on README.md
            var routeResolver = {
              app: ['$wakanda', function($wakanda) {
                  return $wakanda.init();
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
                    .when('/e2e-tests/main', {
                      templateUrl: 'views/e2e-tests/main.html',
                      controller: 'E2E.MainCtrl',
                      resolve: routeResolver
                    })
                    .when('/e2e-tests/db-state', {
                      templateUrl: 'views/e2e-tests/db-state.html',
                      controller: 'E2E.DbStateCtrl',
                      resolve: routeResolver
                    })
                    .when('/e2e-tests/directory-state', {
                      templateUrl: 'views/e2e-tests/directory-state.html',
                      controller: 'E2E.DirectoryStateCtrl'
                    })
                    .when('/e2e-tests/first-draft', {
                      templateUrl: 'views/e2e-tests/first-draft.html',
                      controller: 'E2E.FirstDraftCtrl',
                      resolve: routeResolver
                    })
                    .when('/e2e-tests/directory', {
                      templateUrl: 'views/e2e-tests/directory.html',
                      controller: 'E2E.DirectoryCtrl',
                      resolve: routeResolver
                    })
                    .when('/e2e-tests/directory-stand-alone', {
                      templateUrl: 'views/e2e-tests/directory.html',
                      controller: 'E2E.DirectoryCtrl'
                    })
                    .when('/brut/vanilla-ds', {
                      templateUrl: 'views/brut/vanilla-ds.html',
                      controller: 'Brut.VanillaDsCtrl',
                      resolve: routeResolver
                    })
                    .when('/brut/vanilla-ds2', {
                      templateUrl: 'views/brut/vanilla-ds2.html',
                      controller: 'Brut.VanillaDs2Ctrl',
                      resolve: routeResolver
                    })
                    .otherwise({
                      redirectTo: '/'
                    });
          }]);
