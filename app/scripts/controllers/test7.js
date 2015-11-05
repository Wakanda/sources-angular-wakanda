'use strict';

var ds, employees, employee;

angular.module('angularWakandaFrontApp')
  .controller('Test7Ctrl', ['$scope','$wakanda',function ($scope, $wakanda) {

  ds = $wakanda.$ds;

  var e = $scope.employees = ds.Employee.$all({
    pageSize: 3
  });

  e.$promise.then(function (data) {
    debugger;
  })

  }]);
