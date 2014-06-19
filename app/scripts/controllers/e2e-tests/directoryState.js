'use strict';

var test;

angular.module('angularWakandaFrontApp')
  .controller('E2E.DirectoryStateCtrl', ['$scope',function($scope) {
    $scope.callbackCalledNumberTimes = 0;
    $scope.testCallback = function(){
      $scope.callbackCalledNumberTimes++;
    };
  }]);
