'use strict';

//function-bind-polyfill for PhantomJS
if (!Function.prototype.bind) {
  /* eslint-disable no-extend-native */
  Function.prototype.bind = function bind(that) { // .length is 1
    var self = this;
    if (typeof self !== 'function') {
      throw new TypeError('Function.prototype.bind called on incompatible ' + self);
    }
    var args = Array.prototype.slice.call(arguments, 1); // for normal call
    var bound = function () {

      if (this instanceof bound) {

        var result = self.apply(
            this,
            args.concat(Array.prototype.slice.call(arguments))
        );
        if (Object(result) === result) {
          return result;
        }
        return this;

      } else {
        return self.apply(
            that,
            args.concat(Array.prototype.slice.call(arguments))
        );

      }

    };
    if (self.prototype) {
      var Empty = function () {
      };
      Empty.prototype = self.prototype;
      bound.prototype = new Empty();
    }
    return bound;
  };
}

describe('Service: unitTestsHelpers', function () {  
  
  beforeEach(function(){
    module('unitTestsHelpersModule');
  });

  it('should do be ready to rock', inject(function (unitTestsHelpers) {
    expect(!!unitTestsHelpers).to.be.true;
    expect(!!unitTestsHelpers.db).to.be.true;
    expect(!!unitTestsHelpers.db.flush).to.be.true;
    expect(!!unitTestsHelpers.db.fill).to.be.true;
    expect(!!unitTestsHelpers.db.reset).to.be.true;
    expect(!!unitTestsHelpers.db.state).to.be.true;
  }));

  it('unitTestsHelpers.db.state()', inject(function ($httpBackend,unitTestsHelpers) {
    
    var that = this;
    $httpBackend.whenGET('/unit-tests/db/state').respond({
      "employees":1000,
      "companies":62,
      "products":24
    });

    unitTestsHelpers.db.state().success(function(result){
      expect(result).to.deep.equal({
        "employees":1000,
        "companies":62,
        "products":24
      });
    }).error(function(error){
      console.error('error',error);
      that.fail();
    });
    
    $httpBackend.flush();
    
  }));

  it('unitTestsHelpers.db.fill()', inject(function ($httpBackend,unitTestsHelpers) {
    
    var that = this;
    $httpBackend.whenGET('/unit-tests/db/fill').respond({
      "before":{
        "employees":1000,
        "companies":62,
        "products":24},
      "after":{
        "employees":1000,
        "companies":62,
        "products":24
      },
      "log":"..."
    });

    unitTestsHelpers.db.fill().success(function(result){
      expect(result).to.deep.equal({
        "before":{
          "employees":1000,
          "companies":62,
          "products":24},
        "after":{
          "employees":1000,
          "companies":62,
          "products":24
        },
        "log":"..."
      });
    }).error(function(error){
      console.error('error',error);
      that.fail();
    });
    
    $httpBackend.flush();
    
  }));

  it('unitTestsHelpers.db.flush()', inject(function ($httpBackend,unitTestsHelpers) {
    
    var that = this;
    $httpBackend.whenGET('/unit-tests/db/flush').respond({
      "before":{
        "employees":1000,
        "companies":62,
        "products":24},
      "after":{
        "employees":0,
        "companies":0,
        "products":0
      },
      "log":"..."
    });

    unitTestsHelpers.db.flush().success(function(result){
      expect(result).to.deep.equal({
        "before":{
          "employees":1000,
          "companies":62,
          "products":24},
        "after":{
          "employees":0,
          "companies":0,
          "products":0
        },
        "log":"..."
      });
    }).error(function(error){
      console.error('error',error);
      that.fail();
    });
    
    $httpBackend.flush();
    
  }));

  it('unitTestsHelpers.db.reset()', inject(function ($httpBackend,unitTestsHelpers) {
    
    var that = this;
    $httpBackend.whenGET('/unit-tests/db/reset').respond({
      "before":{
        "employees":1000,
        "companies":62,
        "products":24
      },
      "afterFlush":{
        "employees":0,
        "companies":0,
        "products":0
      },
      "after":{
        "employees":1000,
        "companies":62,
        "products":24
      },
      "log":"..."
    });

    unitTestsHelpers.db.reset().success(function(result){
      expect(result).to.deep.equal({
        "before":{
          "employees":1000,
          "companies":62,
          "products":24
        },
        "afterFlush":{
          "employees":0,
          "companies":0,
          "products":0
        },
        "after":{
          "employees":1000,
          "companies":62,
          "products":24
        },
        "log":"..."
      });
    }).error(function(error){
      console.error('error',error);
      that.fail();
    });
    
    $httpBackend.flush();
    
  }));

});
