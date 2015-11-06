'use strict';

var ds, employees, employee;

angular.module('angularWakandaFrontApp')
  .controller('Test8Ctrl', ['$scope', '$wakanda', function($scope, $wakanda) {

    ds = $wakanda.$ds;

    $scope.employer = 'loading...';
    ds.Employee.oneEmployee().$promise.then(function (event) {
      var entity = event.result;
      var wakEntity = $wakanda.$parsers.WAFEntityToNgWakEntity(entity);

      wakEntity.employer.$fetch().$promise.then(function () {
        $scope.employer = wakEntity.employer.name;
      });

      $scope.savingStatus = 'waiting...';
      wakEntity.$save().$promise.then(function () {
        $scope.savingStatus = 'success';
      });

      ds.Employee.lotsOfEmployees().$promise.then(function (event) {
        var entities = event.result;
        var wakEntities = $wakanda.$parsers.WAFCollectionToNgWakEntityCollection(entities);

        $scope.employees = wakEntities;
      });
    });

  }]);
