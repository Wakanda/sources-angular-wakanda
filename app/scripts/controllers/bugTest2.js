'use strict';

var ds, _, employee;

angular.module('angularWakandaFrontApp')
        .controller('BugTest2Ctrl', ['$scope','$route','$wakanda',function($scope,$route,$wakanda) {
            ds = $wakanda.getDatastore();

            if($route.current.params.employeeId){
              $scope.companies = ds.Company.$query({pageSize:100});
              $scope.companies.$promise.then(function(){
                $scope.employee = employee = ds.Employee.$find($route.current.params.employeeId,{select:'employer'});
              });
            }
            else{
              $scope.error = true;
            }

            $scope.updateRelation = function(employee){
              var company = ds.Company.$create(employee.employer);
              employee.$_entity.employer.setValue(company.$_entity);
            };

            //to force $scope.$apply
            $scope.doSomething = function(){

            };

        }]);
