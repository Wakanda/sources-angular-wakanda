'use strict';

var ds, products;

angular.module('angularWakandaFrontApp')
        .controller('Example1Ctrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
            ds = wakConnectorService.getDs();
            
            $scope.products;
            
            ds.Products.query('name = "po*"',{
                onSuccess:function(result){
                    products = $scope.products = result.result.flatten();
                    $scope.$apply();
                    console.log('$scope.products (inside onSuccess)',$scope.products);
                }
            });
            
        }]);
