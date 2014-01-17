'use strict';

var ds, products, queryResult, toArrayResult;

angular.module('angularWakandaFrontApp')
        .controller('Example2Ctrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
            ds = wakConnectorService.getDs();

            $scope.extended = false;

            $scope.extendView = function(extend){
                $scope.extended = extend;
            };
            
            $scope.query = 'name = "*"';
            
            $scope.products = [];
            
            $scope.$watch('query',function(query){
                if(!query){
                    query = 'name = *';
                }
            
                ds.Products.query(query,{
                    onSuccess:function(result){
                        queryResult = result;
                        result.result.toArray(null,{
                            onSuccess : function(result){
                                $scope.$apply(function(){
                                    toArrayResult = result;
                                    products = $scope.products = result.result;
                                    console.log('products',products);
                                });
                            }
                        });
                    }
                });
                
            });
            
        }]);
