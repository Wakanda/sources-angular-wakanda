'use strict';

describe('Service: unitTestsHelpers', function () {
  
  var $httpBackend, $http;
  
//  // load the service's module
//  beforeEach(module('unitTestsHelpersModule'));
//  
//  beforeEach(angular.mock.module('ngMockE2E'));
//  
//  beforeEach(inject(function ($injector) {
//    $httpBackend = $injector.get('$httpBackend');
//    $httpBackend.whenGET(/.*/).passThrough();
//  }));
  
  beforeEach(function(){
    module('unitTestsHelpersModule');
    module('ngMockE2E');
    inject(function(_$http_, _$httpBackend_){
      $http = _$http_;
      $httpBackend = _$httpBackend_;
//      debugger;
      $httpBackend.whenGET(/.*/).passThrough();
      $httpBackend.whenPOST(/.*/).passThrough();
//      $httpBackend.whenGET(/^\/unit-tests\//).passThrough();
//      $httpBackend.whenPOST(/^\/unit-tests\//).passThrough();
    });
  });
  
  it('should do an xhr', inject(function(){
    var flag = false;
//    debugger;
    
//    $httpBackend.when(/.*/).passThrough();
//    $httpBackend.whenGET('/unit-tests/db/state').passThrough();
    
//    runs(function(){
      console.log('running');
//      debugger;
      $httpBackend.whenGET('/unit-tests/db/state').passThrough();
      $httpBackend.whenPOST('/unit-tests/db/state').passThrough();
      $http.get('/unit-tests/db/state').success(function(){
        console.log('success');
        flag = true;
      }).error(function(){
        console.log('error');
        flag = true;
      });
//    });
    
    waitsFor(function(){
      return flag;
    },"Should return true",3000);
    
    runs(function(){
      expect(flag).toBe(true);
    });
    
  }));

  it('should do be ready to rock', inject(function (unitTestsHelpers) {
    expect(!!unitTestsHelpers).toBe(true);
    expect(!!unitTestsHelpers.db).toBe(true);
    expect(!!unitTestsHelpers.db.flush).toBe(true);
    expect(!!unitTestsHelpers.db.fill).toBe(true);
    expect(!!unitTestsHelpers.db.reset).toBe(true);
    expect(!!unitTestsHelpers.db.state).toBe(true);
  }));

  it('unitTestsHelpers.db.state() - check async connexion', inject(function (unitTestsHelpers) {
    var valueToVerify = false, flag = false;
    
    console.log('0-call',valueToVerify);
//    runs(function(){
      unitTestsHelpers.db.state().success(function(result){
        valueToVerify = result;
        flag = true;
        console.log('4-success',valueToVerify);
      }).error(function(result){
        flag = true;
        console.log('4-error',valueToVerify);
      });
//    });
    
    $httpBackend.whenGET('/unit-tests/db/state').passThrough();
    $httpBackend.whenPOST('/unit-tests/db/state').passThrough();
    
    console.log('1-waitsFor',valueToVerify);
    waitsFor(function(){
//      console.log('5-flag',flag);
      return flag;
    },'The flag should be true', 3000);
    
    console.log('2-runs expects',valueToVerify);
    runs(function(){
      console.log('6-runs expects inside',valueToVerify);
      expect(valueToVerify).not.toBe(false);
    });
    console.log('3-it ended',valueToVerify);
    
  }));

  it('async test example', inject(function(unitTestsHelpers){
    var flag = false, testValue = null;
    
    console.log('0-flag',flag);
    
    setTimeout(function(){
      console.log('3-flag',flag);
      flag = true;
      testValue = "hello world";
      console.log('4-flag',flag);
    },2000);
      
    waitsFor(function(){
      return flag;
    });
    
    console.log('1-flag',flag);
    
    runs(function(){
      console.log('5-flag',flag);
      expect(testValue).toBe("hello world");
    });
    
    console.log('2-flag',flag);
    
  }));
  
  it('unitTestsHelpers.db.state(false) - check sync connexion', inject(function (unitTestsHelpers) {
    var state = unitTestsHelpers.db.state(false);
    expect(state).toBeDefined();
    expect(state.employees).toBeDefined();
    expect(state.companies).toBeDefined();
    expect(state.products).toBeDefined();
  }));

});
