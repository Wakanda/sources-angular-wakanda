'use strict';

var ds, products, toArrayResult, rs, employees, employeesEvent;

angular.module('angularWakandaFrontApp')
        .controller('Test1Ctrl', ['$scope','$rootScope','$wakanda',function($scope,$rootScope,$wakanda) {
            ds = $wakanda.getDatastore();
            rs = $rootScope;
            $scope.extended = false;
            $scope.display = 'Product';

            $scope.extendView = function(extend){
                $scope.extended = extend;
            };
            
            $scope.show = function(tableName){
                $scope.display = tableName;
            };
            
            $scope.orderByOptions = [
                {"label" : "none", "value" : "none"},
                {"label" : "firstName asc", "value" : "firstName:asc"},
                {"label" : "firstName desc", "value" : "firstName:desc"},
                {"label" : "lastName asc", "value" : "lastName:asc"},
                {"label" : "lastName desc", "value" : "lastName:desc"}
            ];
            
            $scope.orderBy = $scope.orderByOptions[0];//init the select to none
            
            var setOrderByFilterOnEmployeesFilteredFromCombo = function(comboValue){
                var tmp;
                if(comboValue.value === "none"){
                    $scope.employeesFilteredPredicate = "";
                }
                else{
                    tmp = comboValue.value.split(':');
                    $scope.employeesFilteredPredicate = tmp[0];
                    $scope.employeesFilteredReverse = tmp[1] === "asc" ? false : true;
                }
            };
            
            $scope.$watch('orderBy',function(comboValue){
                console.log('watch',comboValue);
                setOrderByFilterOnEmployeesFilteredFromCombo(comboValue);
            });
            
            //bellow : server requests
            
            /** products */
            
            $scope.productsQuery = 'name = "*"';
            
            $scope.products = [];
            
            $scope.$watch('productsQuery',function(query){
                if(!query){
                    query = 'name = *';
                }
            
                products = $scope.products = ds.Product.$find({
                    filter : query
                });
                products.$promise.then(function(event){
                    console.log(event);
                });
                
            });
            
            /** employee */
            
//            $scope.employeeQuery = 'firstName = "*" and employer.name = "*"';
            $scope.employeeQuery = 'firstName = "*"';
            
            $scope.employees = [];
            
            $scope.$watch('employeeQuery',function(query){
                if(!query){
                    query = 'firstName = "*"';
                }
            
                employees = $scope.employees = $scope.employeesFiltered = ds.Employee.$find({
                    select : 'firstName, lastName, salary, employer',
//                    select : 'firstName, lastName, salary',
                    filter : query,
//                    limit: 10,
//                    offset : 5,
                    pageSize : 70,//no pageSize on toArray
                    orderBy : 'firstName asc'
                });
                employees.$promise.then(function(event){
                    console.log(event);
                });
                
            });
            
        }]);
