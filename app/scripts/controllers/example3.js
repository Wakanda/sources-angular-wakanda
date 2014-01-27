'use strict';

var ds, products, toArrayResult;

angular.module('angularWakandaFrontApp')
        .controller('Example3Ctrl', ['$scope', 'wakConnectorService', function($scope, wakConnectorService) {
            ds = wakConnectorService.getDatastore();

            $scope.extended = false;

            $scope.extendView = function(extend) {
              $scope.extended = extend;
            };

            $scope.query = 'name = "*"';

            $scope.products = [];

            $scope.$watch('query', function(query) {
              if (!query) {
                query = 'name = *';
              }

              ds.Product.toArray(null, {
                filterQuery: query,
                onSuccess: function(result) {
                  $scope.$apply(function() {
                    toArrayResult = result;
                    products = $scope.products = result.result;
                    console.log('products', products);
                  });
                }
              });

            });

          }]);
