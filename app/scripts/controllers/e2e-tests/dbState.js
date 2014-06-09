'use strict';

var test;

angular.module('angularWakandaFrontApp')
  .controller('E2E.DbStateCtrl', ['$scope',function($scope) {
    $scope.callbackCalledNumberTimes = 0;
    $scope.testCallback = function(){
      $scope.callbackCalledNumberTimes++;
    };
  }]);
