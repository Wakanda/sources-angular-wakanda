'use strict';

/**
 * @ngdoc function
 * @name angularWakandaFrontApp.controller:Test4Ctrl
 * @description
 * # Test4Ctrl
 * Controller of the angularWakandaFrontApp
 */
angular.module('angularWakandaFrontApp')
  .controller('Test4Ctrl', function ($scope, $wakanda) {
    
    window.ds = $wakanda.$ds;
    
    $scope.init = function(){
      window.employees = this.employees = $wakanda.$ds.Employee.$find({
//        select: 'employer.staff.employer',
//        select: 'employer, employer.staff',
        select: 'employer',
        pageSize: 15,
        orderBy: 'ID desc'
      });
    };
    
    /**
     * Creates an employee, assigning an employer to it in the $create method - then save employee
     * OK
     */
    $scope.addEmployee1 = function(){
      var employee = $wakanda.$ds.Employee.$create({
        firstName : "Christophe",
        lastName : "Rosset1",
        employer : this.employees[0].employer
      });
      employee.$save().then(function(){
        $scope.init();
      });
    };
    
    /**
     * Creates an employee, assigning an employer to it via the related attribute - then save employee
     * Needs hack because the relatedAttribute isn't updated on the employee.$_entity pointer
     */
    $scope.addEmployee2 = function(){
      var employee = $wakanda.$ds.Employee.$create({
        firstName : "Christophe",
        lastName : "Rosset2"
      });
      employee.employer = this.employees[0].employer;
      employee.$_entity.employer.setValue(this.employees[0].$_entity.employer.getValue());//hack
      employee.$save().then(function(){
        $scope.init();
      });
    };
    
    /**
     * Updates an employee, changing its employer via the related attribute - then save employee
     * Needs hack because the relatedAttribute isn't updated on the employee.$_entity pointer
     */
    $scope.updateEmployee1 = function(){
      var employee = this.employees[0];
      employee.firstName += (new Date()).getTime();
      employee.employer = this.employees[10].employer;
      employee.$_entity.employer.setValue(this.employees[10].$_entity.employer.getValue());//hack
      employee.$save().then(function(){
        $scope.init();
      });
    };
    
    /**
     * Creates a new company, saves it
     * Creates an employee, assigning the employer via the $create method (same as addEmployee1)
     * OK
     */
    $scope.addEmployeeAndCompany1 = function(){
      var company = $wakanda.$ds.Company.$create({
        name : 'CompanyTOTO'
      });
      company.$save().then(function(){
        var employee = $wakanda.$ds.Employee.$create({
          firstName : "Christophe",
          lastName : "Rosset3",
          employer : company
        });
        employee.$save().then(function(){
          $scope.init();
        });
      });
    };
    
    /**
     * Creates a new company, saves it
     * Creates an employee, assigning the employer via the .employer related attribute (same as addEmployee2)
     * Needs hack because the relatedAttribute isn't updated on the employee.$_entity pointer
     */
    $scope.addEmployeeAndCompany2 = function(){
      var company = $wakanda.$ds.Company.$create({
        name : 'CompanyTOTO2'
      });
      company.$save().then(function(){
        var employee = $wakanda.$ds.Employee.$create({
          firstName : "Christophe",
          lastName : "Rosset4"
        });
        employee.employer = company;
        employee.$_entity.employer.setValue(company.$_entity);//hack (without getValue() - root entity)
        employee.$save().then(function(){
          $scope.init();
        });
      });
    };
    
    $scope.init();
  });
