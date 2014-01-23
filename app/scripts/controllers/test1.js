'use strict';

var ds, products, toArrayResult, rs;

angular.module('angularWakandaFrontApp')
        .controller('Test1Ctrl', ['$scope','$rootScope','wakConnectorService',function($scope,$rootScope,wakConnectorService) {
            ds = wakConnectorService.getDatastore();
            rs = $rootScope;
            $scope.extended = false;
            $scope.display = 'Products';

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
            
                ds.Products.$find({
                    filter : query
                }).then(function(event){
                    console.log(event);
                    products = $scope.products = event.result;
                });
                
            });
            
            /** employee */
            
            $scope.employeeQuery = 'firstName = "*" and employer.name = "*"';
            
            $scope.employees = [];
            
            $scope.$watch('employeeQuery',function(query){
                if(!query){
                    query = 'firstName = "*"';
                }
            
                ds.Employee.$find({
                    select : 'firstName, lastName, salary, employer',
                    filter : query,
//                    limit: 10,
//                    offset : 5,
//                    pageSize : 20,//no pageSize on toArray
                    orderBy : 'firstName asc'
                }).then(function(event){
                    console.log(event);
                    products = $scope.employees = $scope.employeesFiltered = event.result;
                });
                
            });
            
        }]);
