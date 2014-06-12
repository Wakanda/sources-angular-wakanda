'use strict';

var ds, employees;

angular.module('angularWakandaFrontApp')
  .controller('E2E.FirstDraftCtrl', ['$scope','wakConnectorService',function($scope,wakConnectorService) {
      
      ds = wakConnectorService.getDatastore();
      
      $scope.employees = [];
            
      $scope.orderByOptions = [
          {"label" : "none", "value" : undefined},
          {"label" : "firstName asc", "value" : "firstName asc"},
          {"label" : "firstName desc", "value" : "firstName desc"},
          {"label" : "lastName asc", "value" : "lastName asc"},
          {"label" : "lastName desc", "value" : "lastName desc"},
          {"label" : "salary asc", "value" : "salary asc"},
          {"label" : "salary desc", "value" : "salary desc"},
          {"label" : "employer.name asc", "value" : "employer.name asc"},
          {"label" : "employer.name desc", "value" : "employer.name desc"}
      ];
      $scope.wak = {};
      
      $scope.init = function(firstTime){
        console.log('init',$scope.wak.orderBy,$scope.wak.orderBy);
        if(firstTime === true){
          $scope.wak.orderBy = $scope.orderByOptions[0];
          $scope.filter = "";
        }
        employees = $scope.employees = ds.Employee.$find({
          select : 'employer',
          pageSize : 10,
          orderBy : $scope.wak.orderBy.value,
          filter : $scope.filter
        });
        $scope.company = null;
      };
      
      $scope.applyFilter = function(keyCode){
        console.log('applyFilter',keyCode);
        if(keyCode === 13){
          $scope.init(false);
        }
      };
      
      //init
      $scope.init(true);
      
  }]);
