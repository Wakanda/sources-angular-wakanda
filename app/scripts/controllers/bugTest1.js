'use strict';

var ds;

angular.module('angularWakandaFrontApp')
        .controller('BugTest1Ctrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
            ds = wakConnectorService.getDatastore();
    
            $scope.product = ds.Product.$create({name:'TestforBoolean5',myBoolean: true});
            
            $scope.save = function(){
              console.log('BEFORE SAVE',$scope.product.myBoolean);
              $scope.product.$save().then(function(){
                console.log('AFTER SAVE',$scope.product.myBoolean);
              });
            };
            
        }]);
