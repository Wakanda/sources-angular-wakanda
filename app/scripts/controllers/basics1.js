'use strict';

var ds, comp1;

angular.module('angularWakandaFrontApp')
  .controller('Basics1Ctrl', ['$scope', 'wakConnectorService', function($scope, wakConnectorService) {
    
    ds = wakConnectorService.getDatastore();
    
    /** comp1 */
      
    $scope.findComp1 = function(){
      $scope.comp1 = comp1 = ds.Company.$find({});
      comp1.$promise.then(function(){
        console.log('comp1',comp1);
      });
    };
    
    $scope.dispComp1StaffInfos = function(){
      console.log('comp1[2].staff',comp1[2].staff,'comp1[2].staff.$query',comp1[2].staff.$query,'comp1[2].staff.$totalCount',comp1[2].staff.$totalCount,'comp1[2].staff.length',comp1[2].staff.length);
    };
    
    $scope.isLoadedComp1Staff = function(){
      console.log('comp1[2].staff.$isLoaded()',comp1[2].staff.$isLoaded());
    };
    
    $scope.fetchComp1Staff = function(){
      comp1[2].staff.$fetch().then(function(e){
        console.group('They are the same (the first is raw, the second is passed inside the success of the promise');
        console.log('comp1[2].staff',comp1[2].staff);
        console.log('e',e);
        console.groupEnd();
      },function(e){
        console.error(e);
      });
    };
    
    /** comp2 */
    
    $scope.dispComp2StaffInfos = function(){
      console.log('comp1[15].staff',comp1[15].staff,'comp1[15].staff.$query',comp1[15].staff.$query,'comp1[15].staff.$totalCount',comp1[15].staff.$totalCount,'comp1[15].staff.length',comp1[15].staff.length);      
    };
    
    $scope.isLoadedComp2Staff = function(){
      console.log('comp1[15].staff.$isLoaded()',comp1[15].staff.$isLoaded());
    };
    
    $scope.fetchComp2Staff = function(){
      comp1[15].staff.$fetch().then(function(e){
        console.group('They are the same (the first is raw, the second is passed inside the success of the promise');
        console.log('comp1[15].staff',comp1[15].staff);
        console.log('e',e);
        console.groupEnd();
      },function(e){
        console.error(e);
      });
    };
    
    $scope.moreComp2Staff = function(){
      comp1[15].staff.$more().then(function(e){
        console.log('$more','e',e);
      });
    };
    
  }]);