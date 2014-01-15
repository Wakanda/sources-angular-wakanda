'use strict';

angular.module('angularWakandaFrontApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'wakandaConnect1Module'
])
  .config(function ($routeProvider) {
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
        controller: 'RetrieveInfosCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
