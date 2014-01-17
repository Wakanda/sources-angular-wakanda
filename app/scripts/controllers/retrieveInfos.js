'use strict';

var products,productsArray,ds;

angular.module('angularWakandaFrontApp')
    .controller('RetrieveInfosCtrl', ['$scope','wakConnectorService', function($scope,wakConnectorService) {
        ds = wakConnectorService.getDs();

        $scope.extended = false;
        
        $scope.extendView = function(extend){
            $scope.extended = extend;
        };

        //all() version
        products = $scope.products = ds.Products.all({
            onSuccess:function(){ $scope.$apply();}
        });
        console.log('$scope.products',$scope.products);
        
        //toArray() version
        ds.Products.toArray(null,{
            onSuccess:function(result){
                productsArray = $scope.productsArray = result.result;
                $scope.$apply();
                console.log('$scope.productsArray (inside onSuccess)',$scope.productsArray);
            }
        });
        
        
    }]);
