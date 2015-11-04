'use strict';

/**
 * @ngdoc function
 * @name angularWakandaFrontApp.controller:CollectionFindCtrl
 * @description
 * # CollectionFindCtrl
 * Controller of the angularWakandaFrontApp
 */
angular.module('angularWakandaFrontApp')
  .controller('CollectionFindCtrl', function ($scope, $wakanda) {

    $scope.filterEmployees1 = 'employer.name="Calendar Sable Diffusing Ring"';
    $scope.filterEmployees2 = "salary>90000";

    $scope.launchFindEmployees1 = function(){
      window.employees1 = $scope.employees1 = $wakanda.$ds.Employee.$query({
        pageSize : 10,
        select : 'employer',
        filter : $scope.filterEmployees1
      });
      $scope.employees1.$promise.then(function(){
        $scope.launchFindEmployees2();
      });
    };

    $scope.launchFindEmployees2 = function(){
      window.employees2 = $scope.employees2 = $scope.employees1.$query({
        filter : $scope.filterEmployees2,
        orderBy : 'salary desc'
      });
    };

    $scope.callEntityMethod = function(employee){
      employee.myEntityMethod().then(function(e){
        employee.message = e.result;
      });
    };

    $scope.launchFindEmployees1();

  });
