'use strict';

angular.module('angularWakandaFrontApp')
    .controller('RetrieveInfosCtrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
        var ds = wakConnectorService.getDs();
        var products = ds.Products.all();
        console.log(products);
    }]);
