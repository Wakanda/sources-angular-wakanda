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
  .directive('dbState', function (unitTestsHelpers) {
    return {
//      restrict: 'E',
      templateUrl: './views/templates/dbState.html',
      scope : {
        initAsync : '&initAsync',
        initCollapsed : '&initCollapsed',
        changeCallback : '&changeCallback'
      },
      link: function($scope, element, attrs){
        var tempResult;
        
        $scope.dbState = null;
        $scope.log = "";
        
        $scope.collapsed = typeof $scope.initCollapsed() === 'undefined' ? false : $scope.initCollapsed();
        $scope.async =  typeof $scope.initAsync() === 'undefined' ? true : $scope.initAsync();
        $scope.loading = false;
        
        $scope.initCollapsed = true;
        
        if($scope.async === true){
          console.log('call async');
          $scope.loading = true;
          unitTestsHelpers.db.state().success(function(result){
            $scope.dbState = result;
            $scope.log += "State updated\n";
            $scope.loading = false;
          }).error(function(result){
            $scope.dbState = false;
            $scope.loading = false;
          });
        }
        else{
          console.log('call sync');
          tempResult = unitTestsHelpers.db.state(false);
          if(tempResult.error !== true){
            $scope.dbState = tempResult;
            $scope.log += "State updated\n";
          }
          else{
            $scope.dbState = false;
          }
        }
        
        $scope.toggleBody = function(){
          $scope.collapsed = !$scope.collapsed;
        };

        $scope.initDb = function(){
          if($scope.async === true){
            console.log('call async');
            $scope.loading = true;
            unitTestsHelpers.db.reset()
              .success(function(result){
                $scope.dbState = result.after;
                $scope.log += ">resetDb\n"+result.log+"\n";
                $scope.loading = false;
                $scope.changeCallback();
              }).error(function(result){
                $scope.log = "An error occured\n";
                $scope.loading = false;
                $scope.changeCallback();
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.db.reset(false);
            if(tempResult.error !== true){
              $scope.dbState = tempResult.after;
              $scope.log += ">resetDb\n"+tempResult.log+"\n";
              $scope.changeCallback();
            }
            else{
              $scope.log = "An error occured\n";
              $scope.changeCallback();
            }
          }
        };

        $scope.refreshState = function(){
          if($scope.async === true){
            console.log('call async');
            $scope.loading = true;
            unitTestsHelpers.db.state()
              .success(function(result){
                $scope.dbState = result;
                $scope.log += "State updated\n";
                $scope.loading = false;
              }).error(function(result){
                $scope.log += "An error occured\n";
                $scope.loading = false;
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.db.state(false);
            if(tempResult.error !== true){
              $scope.dbState = tempResult;
              $scope.log += "State updated\n";
            }
            else{
              $scope.log = "An error occured\n";
            }
          }
        };

        $scope.flushDb = function(){
          if($scope.async === true){
            console.log('call async');
            $scope.loading = true;
            unitTestsHelpers.db.flush()
              .success(function(result){
                $scope.dbState = result.after;
                $scope.log += ">flushDb\n"+result.log+"\n";
                $scope.loading = false;
                $scope.changeCallback();
              }).error(function(result){
                $scope.log += "An error occured\n";
                $scope.loading = false;
                $scope.changeCallback();
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.db.flush(false);
            if(tempResult.error !== true){
              $scope.dbState = tempResult.after;
              $scope.log += ">flushDb\n"+tempResult.log+"\n";
              $scope.changeCallback();
            }
            else{
              $scope.log = "An error occured\n";
              $scope.changeCallback();
            }
          }
        };
    
      }
    };
  });
