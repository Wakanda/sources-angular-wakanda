'use strict';

var products,productsArray,ds;

angular.module('angularWakandaFrontApp')
    .controller('RetrieveInfosCtrl', ['$scope','wakConnectorService', '$q',function($scope,wakConnectorService, $q) {
        ds = wakConnectorService.getDs();

        //all() version
        $scope.products;
        products = $scope.products = ds.Products.all({
            onSuccess:function(){ $scope.$apply();}
        });
        console.log('$scope.products',$scope.products);
        
        //toArray() version
        $scope.productsArray;
        ds.Products.toArray(null,{
            onSuccess:function(result){
                productsArray = $scope.productsArray = result.result;
                $scope.$apply();
                console.log('$scope.productsArray (inside onSuccess)',$scope.productsArray);
            }
        });
        
        
    }]);
