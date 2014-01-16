'use strict';

//yes, this is a global (it is meant to be, so that you could play with it in the console)
var connectDs;

angular.module('angularWakandaFrontApp')
    .controller('Connect1Ctrl', ['$scope', 'wakandaConnect1Service', function($scope, wakandaConnect1Service) {
        //init scope variables
        $scope.catalog = "";
        $scope.forceReload = false;
        
        //declare public scope methods
        $scope.getDs = function(){
            connectDs = wakandaConnect1Service.getDs({
                catalog : $scope.catalog,
                forceReload : $scope.forceReload
            });
            console.log('connectDs',connectDs);
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
            console.log('connectDs',connectDs);
        };
    }]);
