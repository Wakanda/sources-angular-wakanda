'use strict';

var products, productsArray, ds;

angular.module('angularWakandaFrontApp')
        .controller('RetrieveInfosCtrl', ['$scope', '$wakanda', function($scope, $wakanda) {
            ds = $wakanda.getDatastore();

            $scope.extended = false;

            $scope.extendView = function(extend) {
              $scope.extended = extend;
            };

            //all() version
            products = $scope.products = ds.Product.all({
              onSuccess: function() {
                $scope.$apply();
              }
            });
            console.log('$scope.products', $scope.products);

            //toArray() version
            ds.Product.toArray(null, {
              onSuccess: function(result) {
                productsArray = $scope.productsArray = result.result;
                $scope.$apply();
                console.log('$scope.productsArray (inside onSuccess)', $scope.productsArray);
              }
            });


          }]);
