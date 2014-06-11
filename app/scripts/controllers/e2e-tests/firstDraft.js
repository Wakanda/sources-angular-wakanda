'use strict';

var ds, employees;

angular.module('angularWakandaFrontApp')
  .controller('E2E.FirstDraftCtrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
      
      ds = wakConnectorService.getDatastore();
      
      $scope.employees = [];
      $scope.company = null;
            
      $scope.orderByOptions = [
          {"label" : "none", "value" : undefined},
          {"label" : "firstName asc", "value" : "firstName:asc"},
          {"label" : "firstName desc", "value" : "firstName:desc"},
          {"label" : "lastName asc", "value" : "lastName:asc"},
          {"label" : "lastName desc", "value" : "lastName:desc"}
      ];
      
      $scope.init = function(){
        $scope.orderBy = $scope.orderByOptions[0];
        employees = $scope.employees = ds.Employee.$find({
          select : 'employer',
          pageSize : 10,
          orderBy : $scope.orderBy
        });
        $scope.company = null;
      };
      
      //init
      $scope.init();
      
  }]);
