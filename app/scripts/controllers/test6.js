'use strict';

var ds, employees, employee;

angular.module('angularWakandaFrontApp')
  .controller('Test6Ctrl', ['$scope','$wakanda',function ($scope, $wakanda) {

  ds = $wakanda.$ds;
  $scope.employee = null;
  employees = $scope.employees = ds.Employee.$find({
    pageSize: 5,
    orderBy : 'firstName asc'
  });

  $scope.selectEmployee = function(selected) {
    $scope.employee = employee = selected;
  };

  $scope.uploadFile = function() {
    var file = document.getElementById('file').files[0];
    $scope.employee.photo.$upload(file).then(function(e) {
      console.warn('> upload file success');
    });
  };

  }]);
