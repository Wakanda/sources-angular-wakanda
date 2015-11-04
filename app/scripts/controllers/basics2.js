'use strict';

var ds;

angular.module('angularWakandaFrontApp')
  .controller('Basics2Ctrl', ['$scope', '$wakanda', function($scope, $wakanda) {

    ds = $wakanda.getDatastore();
    $scope.companies = [];
    $scope.currentCompany = null;

    $scope.findCompany = function(options){
      $scope.currentCompany = null;
      $scope.companies = ds.Company.$query(options);
      return $scope.companies;
    };

    $scope.findStaffFromCompany = function(company){
      $scope.currentCompany = company;
      $scope.currentCompany.staff.$fetch();
    };

    //init
//    $scope.findCompany().$promise.then(function(){
////      if($scope.companies[15]){
////        $scope.findStaffFromCompany($scope.companies[15]);
////      }
//    });

  }]);
