'use strict';

var ds, products, employees;

angular.module('angularWakandaFrontApp')
  .controller('Test3Ctrl', ['$scope','$wakanda',function ($scope, $wakanda) {
    
    //retrieve infos from db
//    ds = $wakanda.getDatastore();
    ds = $wakanda.$ds;
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
    ds = $wakanda.getDatastore();
    employees = $scope.employees = ds.Employee.$find({
      select : 'firstName, lastName, salary, employer',
      pageSize:5,
      orderBy : 'firstName asc'
    });
    employees.$promise.then(function(event){
        console.log('CTRL - employees',event,employees);
//        employees = $scope.employees = event.result;
    });
  }]);
