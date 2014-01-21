'use strict';

var ds, products, queryResult;

angular.module('angularWakandaFrontApp')
        .controller('Example1Ctrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
            ds = wakConnectorService.getDatastore();
            
            $scope.query = 'name = "*"';
            
            $scope.products = [];
            
            $scope.$watch('query',function(query){
                if(!query){
                    query = 'name = *';
                }
            
                ds.Products.query(query,{
                    onSuccess:function(result){
                        $scope.$apply(function(){
                            queryResult = result;
                            products = $scope.products = result.result.flatten();
                        });
                        console.log('$scope.products (inside onSuccess)',$scope.products);
                    }
                });
                
            });
            
//            ds.Products.query('name = "po*"',{
//                onSuccess:function(result){
//                    products = $scope.products = result.result.flatten();
//                    $scope.$apply();
//                    console.log('$scope.products (inside onSuccess)',$scope.products);
//                }
//            });
            
        }]);
