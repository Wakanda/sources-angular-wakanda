'use strict';

var ds, employees, companies, company, employeeCollection, employeeResult, event, test;

angular.module('angularWakandaFrontApp')
  .controller('Brut.VanillaDs2Ctrl', ['$scope','$wakanda','rootScopeSafeApply',function($scope,$wakanda,rootScopeSafeApply) {
      
      //usual ds like the one in from the DataProvider
      ds = $wakanda.getDatastore();
      var pageSize = 10;
      employees = [];
      companies = [];
      
      
      //simple query executed at page load
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
      
      
      var finiteLoopForEachInCache = function(result,deep){
        result.forEachInCache({
          onSuccess : function(item){
            //case this is an employee inside a company which we dove into
            if(deep === true){
              console.log(item);
            }
            //since WAF.EntityCollection is not global, can't do instanceOf so check for .each
            //case this is an employee with an employer (the one at the root which we will dive into)
            if(item.entity.employer && item.entity.employer.getValue() && item.entity.employer.getValue().staff.getValue().each && deep !== true){
              //ds.Company.getEntity(item.entity.employer.getValue().getKey());
              employees.push(item.entity);
              companies.push(item.entity.employer.getValue());
              console.group(item.entity.firstName.getValue(),item.entity.lastName.getValue(),"("+item.entity.employer.getValue().name.getValue()+")",item.entity.employer.getValue().staff.getValue());
              finiteLoopForEachInCache(item.entity.employer.getValue().staff.getValue(),true);
              console.groupEnd();
            }
          }
        });
      };
      
      $scope.finiteLoopForEachInCache = function(){
        finiteLoopForEachInCache(employeeResult);
        console.log('ds.Empoyee.getCache()',ds.Employee.getCache());
        console.log('ds.Company.getCache()',ds.Company.getCache());
      };
      
      //init page with this
      init();
      
  }]);
