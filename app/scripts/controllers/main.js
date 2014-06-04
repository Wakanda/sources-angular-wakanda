'use strict';

var test;

angular.module('angularWakandaFrontApp')
  .controller('MainCtrl', ['$scope','unitTestsHelpers',function($scope,unitTestsHelpers) {
      
    $scope.dbState = null;
    $scope.log = "";
    
    test = unitTestsHelpers;
    
    unitTestsHelpers.db.state().success(function(result){
      $scope.dbState = result;
      $scope.log += "State updated\n";
    }).error(function(result){
      $scope.dbState = false;
    });
    
    $scope.initDb = function(){
      unitTestsHelpers.db.reset()
        .success(function(result){
          $scope.dbState = result.after;
          $scope.log += ">resetDb\n"+result.log+"\n";
        }).error(function(result){
          $scope.log = "An error occured\n";
        });
    };
    
    $scope.refreshState = function(){
      unitTestsHelpers.db.state()
        .success(function(result){
          $scope.dbState = result;
          $scope.log += "State updated\n";
        }).error(function(result){
          $scope.log += "An error occured\n";
        });
    };
    
    $scope.flushDb = function(){
      unitTestsHelpers.db.flush()
        .success(function(result){
          $scope.dbState = result.after;
          $scope.log += ">flushDb\n"+result.log+"\n";
        }).error(function(result){
          $scope.log += "An error occured\n";
        });
    };
    
  }]);
