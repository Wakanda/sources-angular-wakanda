'use strict';

angular.module('angularWakandaFrontApp')
    .controller('Connect1Ctrl', ['$scope', 'wakandaConnect1Service', function($scope, wakandaConnect1Service) {
        //init scope variables
        $scope.catalog = "";
        $scope.forceReload = false;
        
        //declare public scope methods
        $scope.getDs = function(){
            var closuredDs = wakandaConnect1Service.getDs({
                catalog : $scope.catalog,
                forceReload : $scope.forceReload
            });
            console.log('closuredDs',closuredDs);
        };
        $scope.getDsWithCallbacks = function(){
            var closuredDs = wakandaConnect1Service.getDs({
                catalog : $scope.catalog,
                forceReload : $scope.forceReload,
                success : function(ds){
                    console.log('>getDsWithCallbacks - Retrieved this object :',ds);
                },
                error : function(e){
                    console.error('getDsWithCallbacks - got an error',e);
                }
            });
            console.log('closuredDs',closuredDs);
        };
    }]);
