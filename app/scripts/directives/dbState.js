'use strict';
/**
 * This directive exposes the database state manager
 * 
 * init-async and init-collapsed are optional
 * 
 * @example <div db-state init-async="false" init-collapsed="false"></div>
 * 
 */
angular.module('angularWakandaFrontApp')
  .directive('dbState', function (unitTestsHelpers) {
    console.log(unitTestsHelpers);
    return {
//      restrict: 'E',
      templateUrl: './views/templates/dbState.html',
      scope : {
        initAsync : '&initAsync',
        initCollapsed : '&initCollapsed'
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
          $scope.loading = false;
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
              }).error(function(result){
                $scope.log = "An error occured\n";
                $scope.loading = false;
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.db.reset(false);
            if(tempResult.error !== true){
              $scope.dbState = tempResult.after;
              $scope.log += ">resetDb\n"+tempResult.log+"\n";
            }
            else{
              $scope.log = "An error occured\n";
            }
            $scope.loading = false;
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
            $scope.loading = false;
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
              }).error(function(result){
                $scope.log += "An error occured\n";
                $scope.loading = false;
              });
          }
          else{
            console.log('call sync');
            tempResult = unitTestsHelpers.db.flush(false);
            if(tempResult.error !== true){
              $scope.dbState = tempResult.after;
              $scope.log += ">flushDb\n"+tempResult.log+"\n";
            }
            else{
              $scope.log = "An error occured\n";
            }
            $scope.loading = false;
          }
        };
    
      }
    };
  });
