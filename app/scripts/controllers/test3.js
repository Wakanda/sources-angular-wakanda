'use strict';

var ds, products, employees;

angular.module('angularWakandaFrontApp')
  .controller('Test3Ctrl', ['$scope','wakConnectorService',function ($scope, wakConnectorService) {
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    ds.Product.$find({
      pageSize:5
    }).then(function(event){
        console.log(event);
        products = $scope.products = event.result;
    });
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    ds.Employee.$find({
      select : 'firstName, lastName, salary, employer',
      pageSize:5
    }).then(function(event){
        console.log(event);
        employees = $scope.employees = event.result;
    });
    
  }]);
