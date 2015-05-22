'use strict';

var ds, products, employees;

angular.module('angularWakandaFrontApp')
  .controller('Test5Ctrl', ['$scope','$wakanda',function ($scope, $wakanda) {

  ds = $wakanda.$ds;
  products = $scope.products = ds.Product.$find({
    pageSize: 5,
    orderBy : 'name asc'
  });

  $scope.attributes = Object.keys(ds.Product.$attr());

  $scope.isImageAttribute = function(attribute) {
    return ds.Product.$attr(attribute).type === 'image';
  };
  }]);
