'use strict';

var ds, products, employees;

angular.module('angularWakandaFrontApp')
  .controller('Test3Ctrl', ['$scope','wakConnectorService',function ($scope, wakConnectorService) {
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    products = $scope.products = ds.Product.$find({
      pageSize:5
    });
    products.$promise.then(function(event){
        console.log('CTRL - products',event,products);
//        products = $scope.products = event.result;
    });
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    employees = $scope.employees = ds.Employee.$find({
      select : 'firstName, lastName, salary, employer',
      pageSize:5
    });
    employees.$promise.then(function(event){
        console.log('CTRL - employees',event,employees);
//        employees = $scope.employees = event.result;
    });
    
  }]);
