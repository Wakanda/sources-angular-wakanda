'use strict';

angular.module('angularWakandaFrontApp')
    .controller('RetrieveInfosCtrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
        wakConnectorService.wait(1000,false).then(function(result){
            console.log('success',result,wakConnectorService.getTime());
        },function(error){
            console.error('error',error,wakConnectorService.getTime());
        });
    }]);
