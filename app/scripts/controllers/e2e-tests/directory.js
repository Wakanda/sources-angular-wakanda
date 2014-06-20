'use strict';

var ds, directory, employees, test;

angular.module('angularWakandaFrontApp')
  .controller('E2E.DirectoryCtrl', ['$scope','$location','wakConnectorService','unitTestsHelpers',function($scope,$location,wakConnectorService,unitTestsHelpers) {
      
      //this controller and its view are used for two routes
      $scope.standAlone = $location.url() !== '/e2e-tests/directory' ? true : false;
      
      directory = wakConnectorService.directory;
      
      //only retrieve datastore in non standAlone mode
      if($scope.standAlone === false){
        ds = wakConnectorService.getDatastore();
      }
      
      var setEmployees = function(){
        if($scope.standAlone){
          employees = $scope.employees = [
            {
              firstName : 'HARRY',
              lastName : 'LUHEJI',
              salary : 132765,
              employer : {
                name : 'Bag While Engineering'
              }
            },
            {
              firstName : 'REFUGIO',
              lastName : 'VEGGGAR',
              salary : 86982,
              employer : {
                name : 'Kilo Data Ireland'
              }
            },
            {
              firstName : 'OBI WAN',
              lastName : 'KENOBI',
              salary : 23,
              employer : {
                name : 'Jedi Master'
              }
            }
          ];
        }
        else{
          employees = $scope.employees = ds.Employee.$find({
            pageSize : 12,
            select : 'employer'
          });
        }
      };
      
      var resetBelongsGroupInfo = function(){
        $scope.userBelongsTo = {
          Admin : null,
          Employee : null,
          Foo : null
        };
      };
      
      $scope.init = function(){
        setEmployees();
        $scope.loggedInEmployee = null;
        $scope.currentLoggedInUser = {result: null};
        resetBelongsGroupInfo();
      };
      
      $scope.login = function(employee){
        directory.$login(employee.lastName,employee.firstName).then(function(result){
          console.log('login()','result',result);
          if(result.result === true){
            $scope.loggedInEmployee = employee;
            $scope.loggedInError = null;
          }
          else{
            $scope.loggedInEmployee = null;
            $scope.loggedInError = "Couldn't login with "+employee.lastName+", "+employee.firstName+" - "+JSON.stringify(result);
          }
          resetBelongsGroupInfo();
        },function(result){
          console.error('login()','result',result);
          $scope.loggedInEmployee = null;
          $scope.loggedInError = "Couldn't login with "+employee.lastName+", "+employee.firstName+" - "+JSON.stringify(result);
          resetBelongsGroupInfo();
        });
      };
      
      $scope.currentUserBelongsTo = function(group){
        directory.$currentUserBelongsTo(group).then(function(result){
          console.log('currentUserBelongsTo("'+group+'")', 'result',result);
          $scope.userBelongsTo[group] = result.result;
        }, function(result){
          console.error('currentUserBelongsTo("'+group+'")', 'result',result);
          $scope.userBelongsTo[group] = "error";
        });
      };
      
      $scope.logout = function(){
        directory.$logout().then(function(result){
          console.log('logout()','result',result);
          $scope.loggedInEmployee = null;
          resetBelongsGroupInfo();
        },function(result){
          console.error('logout()','result',result);
        });
      };
      
      $scope.currentUser = function(){
        directory.$currentUser().then(function(result){
          console.log('currentUser()','result',result);
          $scope.currentLoggedInUser = result;
        },function(result){
          console.error('currentUser()','result',result);
        });
      };
      
      $scope.init();
      
}]);