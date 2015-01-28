'use strict';

var ds, employees, company;

angular.module('angularWakandaFrontApp')
  .controller('E2E.FirstDraftCtrl', ['$scope','$wakanda',function($scope,$wakanda) {
      
      ds = $wakanda.getDatastore();
      
      $scope.employees = [];
            
      $scope.orderByOptions = [
        {"label" : "none", "value" : undefined},
        {"label" : "firstName asc", "value" : "firstName asc"},
        {"label" : "firstName desc", "value" : "firstName desc"},
        {"label" : "lastName asc", "value" : "lastName asc"},
        {"label" : "lastName desc", "value" : "lastName desc"},
        {"label" : "salary asc", "value" : "salary asc"},
        {"label" : "salary desc", "value" : "salary desc"},
        {"label" : "employer.name asc", "value" : "employer.name asc"},
        {"label" : "employer.name desc", "value" : "employer.name desc"}
      ];
      $scope.wak = {};
      
      $scope.init = function(firstTime){
        console.log('init',$scope.wak.orderBy,$scope.wak.orderBy);
        if(firstTime === true){
          $scope.wak.orderBy = $scope.orderByOptions[0];
          $scope.wak.staffOrderBy = $scope.orderByOptions[0];
          $scope.filter = "";
        }
        employees = $scope.employees = ds.Employee.$find({
          select : 'employer',
          pageSize : 10,
          orderBy : $scope.wak.orderBy.value,
          filter : $scope.filter
        });
        company = $scope.company = null;
      };
      
      $scope.applyFilter = function(keyCode){
        console.log('applyFilter',keyCode);
        if(keyCode === 13){
          $scope.init(false);
        }
      };
      
      $scope.editEmployee = function(employee){
        window.scrollTo(0,document.body.clientHeight);
        $scope.currentEmployee = employee;
      };
      
      $scope.saveEmployeeEdits = function(){
        $scope.currentEmployee.$save().then(function(){
          $scope.currentEmployee = null;
        });
      };
      
      $scope.selectCompany = function(myCompany){
        console.log(myCompany,myCompany.staff, typeof myCompany.staff);
        if(typeof myCompany.staff === 'undefined'){
          $scope.nestedCompanyLoadingError = true;
        }
        else{
          $scope.nestedCompanyLoadingError = false;
        }
        console.log($scope.nestedCompanyLoadingError);
        company = $scope.company = myCompany;
      };
      
      $scope.filterStaffOrderBy = function(option){
        if(option.value && option.value.indexOf("employer.name") > -1){
          return false;
        }
        return option;
      };
      
      //init
      $scope.init(true);
      
  }]);
