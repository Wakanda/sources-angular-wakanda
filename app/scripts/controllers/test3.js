'use strict';

var ds, products, employees;

angular.module('angularWakandaFrontApp')
  .controller('Test3Ctrl', ['$scope','wakConnectorService',function ($scope, wakConnectorService) {
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    products = $scope.products = ds.Product.$find({
      pageSize:5,
      orderBy : 'name asc'
    });
    products.$promise.then(function(event){
        console.log('CTRL - products',event,products);
//        products = $scope.products = event.result;
    });
    
    //call to a user method
    $scope.callProduct = function(product){
      product.myEntityMethod('how','do',(new Date()).getTime()).then(function(e){
        product.infos = e.result;
      });
    };
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    employees = $scope.employees = ds.Employee.$find({
      select : 'firstName, lastName, salary, employer, photo',
      pageSize:5,
      orderBy : 'firstName asc'
    });
    employees.$promise.then(function(event){
        console.log('CTRL - employees',event,employees);
//        employees = $scope.employees = event.result;
    });
    
    $scope.employeeImageSrc = null;
    
    $scope.displayPhoto = function(employee){
      $scope.employeeImageSrc = employee.photo.src;
    };
    
  }]);
