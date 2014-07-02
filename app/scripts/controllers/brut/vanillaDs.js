'use strict';

var ds, employees, company, employeeCollection, employeeResult, event, test;

angular.module('angularWakandaFrontApp')
  .controller('Brut.VanillaDsCtrl', ['$scope','$wakanda','rootScopeSafeApply',function($scope,$wakanda,rootScopeSafeApply) {
      
      ds = $wakanda.getDatastore();
      var pageSize = 10;
      
      var init = function(){
        var wakOptions = {};
        wakOptions.filter = '*';
        wakOptions.autoExpand = 'employer.staff';
        wakOptions.orderby = null;
        wakOptions.pageSize = pageSize;
        wakOptions.onSuccess = function(e){
          event = e;
          console.log('e',e);
          employeeCollection = e.entityCollection;
          employeeResult = e.result;
        };        
        ds.Employee.query(null,wakOptions);
      };
      
      var finiteLoop = function(result,deep){
        result.forEachInCache({
          onSuccess : function(item){
            if(deep === true){
              console.log(item);
            }
            //since WAF.EntityCollection is not global, can't do instanceOf so check for .each
            if(item.entity.employer && item.entity.employer.getValue() && item.entity.employer.getValue().staff.getValue().each && deep !== true){
              console.group(item.entity.firstName.getValue(),item.entity.lastName.getValue(),"("+item.entity.employer.getValue().name.getValue()+")",item.entity.employer.getValue().staff.getValue());
              finiteLoop(item.entity.employer.getValue().staff.getValue(),true);
              console.groupEnd();
            }
          }
        });
      };
      
      //call that function
      $scope.finite = function(){
        finiteLoop(employeeResult);
      };
      
      //init page with this
      init();
      
  }]);
