'use strict';
/**
 * This directive exposes the database state manager
 * 
 * init-async, init-collapsed change-callback and are optional
 * 
 * @example <div db-state init-async="false" init-collapsed="false" change-callback="myCallback()"></div>
 * 
 */
angular.module('angularWakandaFrontApp')
  .directive('directoryState', function (unitTestsHelpers) {
    return {
//      restrict: 'E',
      templateUrl: './views/templates/directoryState.html',
      scope : {
        initAsync : '&initAsync',
        initCollapsed : '&initCollapsed',
        changeCallback : '&changeCallback'
      },
      link: function($scope, element, attrs){
        var tempResult;
        
        $scope.collapsed = typeof $scope.initCollapsed() === 'undefined' ? false : $scope.initCollapsed();
        $scope.async =  typeof $scope.initAsync() === 'undefined' ? true : $scope.initAsync();
        $scope.loading = false;
        
        $scope.currentLoggedInUser = null;
        
        $scope.initCollapsed = true;
        
        if($scope.async === true){
          console.log('call async');
          $scope.loading = true;
          unitTestsHelpers.directory.currentUser().success(function(result){
            $scope.currentLoggedInUser = result;
            $scope.loading = false;
          }).error(function(result){
            $scope.currentLoggedInUser = result;
            $scope.loading = false;
          });
        }
        else{
          console.log('call sync');
          tempResult = unitTestsHelpers.directory.currentUser(false);
          $scope.currentLoggedInUser = tempResult;
        }
        
        $scope.toggleBody = function(){
          $scope.collapsed = !$scope.collapsed;
        };

        $scope.currentUser = function(){
          if($scope.async === true){
            console.log('call async');
            $scope.loading = true;
            unitTestsHelpers.directory.currentUser()
              .success(function(result){
                $scope.currentLoggedInUser = result;
                $scope.loading = false;
              }).error(function(result){
                $scope.currentLoggedInUser = result;
                $scope.loading = false;
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.directory.currentUser(false);
            $scope.currentLoggedInUser = tempResult;
          }
        };

        $scope.logout = function(){
          if($scope.async === true){
            console.log('call async');
            $scope.loading = true;
            unitTestsHelpers.directory.logout()
              .success(function(result,status){
                console.log('logout',result,status);
                $scope.currentLoggedInUser = {result: null};
                $scope.loading = false;
                $scope.changeCallback();
              }).error(function(result,status){
                //http return status 401 is not an error on logout
                if(status === 401){
                  console.log('logout',result,status);
                  $scope.currentLoggedInUser = {result: null};
                }
                else{
                  console.error('logout',result,status);
                  $scope.currentLoggedInUser = {result: {error : "Error while logging out"} };
                }
                $scope.loading = false;
                $scope.changeCallback();
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.directory.logout(false);
            if(!tempResult.error){
              console.log('logout',tempResult);
              $scope.currentLoggedInUser = {result: null};
            }
            else{
              console.error('logout',tempResult);
              $scope.currentLoggedInUser = {result: {error : "Error while logging out"} };
            }
            $scope.changeCallback();
          }
        };
    
      }
    };
  });
