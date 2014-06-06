'use strict';

angular.module('angularWakandaFrontApp')
  .directive('dbState', function (unitTestsHelpers) {
    console.log(unitTestsHelpers);
    return {
//      restrict: 'E',
      templateUrl: './views/templates/dbState.html',
      link: function($scope, element, attrs){
        var tempResult;
        $scope.dbState = null;
        $scope.log = "";
        
        $scope.collapsed = false;
        $scope.async = true;
        $scope.loading = false;
        
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
