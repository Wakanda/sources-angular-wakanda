describe('Connector/Entity:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
    intervalRef,
    employees, employee,
    ds;

  beforeEach(function() {
    if(! $wakanda) {
      module('wakanda');
      module('unitTestsHelpersModule');
      inject(function(_$rootScope_, _$wakanda_, _$q_, _unitTestsHelpers_) {
          $q = _$q_;
          $rootScope = _$rootScope_;
          $wakanda = _$wakanda_;
          unitTestsHelpers = _unitTestsHelpers_;
          unitTestsHelpers.db.reset(false);
          // https://github.com/domenic/chai-as-promised/issues/68
          intervalRef = setInterval(function(){ $rootScope.$apply(); }, 1);
      });
    }
  });

  beforeEach(function(done) {
    if(ds) {
      done();
    } else {
      $wakanda.init().then(function(dataStore) {
        ds = dataStore;
        done();
      });
    }
  });

  beforeEach(function(done) {
    employees = $wakanda.$ds.Employee.$find();
    employees.$promise.then(function() {
      employee = employees[0];
      done();
    });
  });

  describe('$findOne() function', function() {
    it('should find an entity', function (done) {
      var employee2 = ds.Employee.$findOne(employee.ID);
      employee2.$promise.then(function() {
        expect(employee2.ID).to.be.equal(parseInt(employee.ID));
        expect(employee2.ID).to.be.equal(parseInt(employee2.$key()));
        done();
      });
    });
    it('should return an error if not found', function (done) {
      try {
        ds.Employee.$findOne({filter: 'firstName = "abc"'});
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
    it('should provide $key method', function (done) {
      expect(employee.ID).to.be.equal(parseInt(employee.$key()));
      done();
    });
    it('should return undefined when no entity is defined', function (done) {
      employee.$_entity = null;
      expect(employee.$key()).to.be.undefined;
      done();
    });
    it('should return key when no entity is defined but we have key', function (done) {
      employee.$_entity = null;
      employee.$_key = '123';
      expect(employee.$key()).to.be.equal('123');
      done();
    });
    it('should provide $stamp method', function (done) {
      expect(employee.$stamp()).to.be.a('number');
      done();
    });
    it('should return undefined when no entity is defined', function (done) {
      employee.$_entity = null;
      expect(employee.$stamp()).to.be.undefined;
      done();
    });
    it('should provide $isNew method', function (done) {
      expect(employee.$isNew()).to.be.a('boolean');
      done();
    });
    it('should return undefined when no entity is defined', function (done) {
      employee.$_entity = null;
      expect(employee.$isNew()).to.be.undefined;
      done();
    });
  });

  describe('$fetch() function', function() {
    it('should fetch the data', function (done) {
      employee.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should refresh when empty', function (done) {
      employee.$fetch().should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should throw an error when select can\'t be change on a $fetch', function (done) {
      try {
        employee.$fetch({ select: 'staff' });
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
    it('should throw an error when orderBy can\'t be change on a $fetch', function (done) {
      try {
        employee.$fetch({ orderBy: 'firstName asc' });
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
    it('should accept other params like start and params', function (done) {
      employee.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should work in replace mode', function (done) {
      employees.$fetch({ start: 1, params: ['a*', 5000] },'replace').should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should work in append mode', function (done) {
      employee.$fetch({ start: 1, params: ['a*', 5000] },'append').should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should throw an error with unknown modes', function (done) {
      try {
        employee.$fetch({ start: 1 },'geronimoMode');
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
  });

  describe('$isLoaded() function', function() {
    it('should return the status of a query', function (done) {
      expect(employee.$isLoaded()).to.be.true;
      done();
    });
  });

  describe('$remove() function', function() {
    it('should remove an entity', function (done) {
      var employeeToRemove = employees['0'];
      employees['0'].$remove().should.be.fulfilled.then(function(removeResult){
        expect(removeResult).to.be.an('object');
        employees = $wakanda.$ds.Employee.$find();
        employees.$promise.then(function() {
          expect(employees['0']).to.be.not.deep.equal(employeeToRemove);
          done();
        });
      });
    });
    it('should return an error if not found', function (done) {
      var employeeToRemove = employees['0'];
      employeeToRemove.$_entity = null;
      try {
        employeeToRemove.$remove();
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
  });

  describe('$save() function', function() {
    it('should save a created entity', function(done) {
      var newPerson = { firstName : "John", lastName : "Smith", salary: 90000 };
      var person = $wakanda.$ds.Employee.$create( newPerson );
      person.$save().should.be.fulfilled.then(function(saveResult) {
        expect(saveResult).to.be.an('object');
        expect(person.firstName).to.be.equal(saveResult.entity.firstName.value);
        done();
      });
    });
    it('should update an existing entity', function(done) {
      employee.firstName = 'Geronimo';
      employee.$save().should.be.fulfilled.then(function(saveResult) {
        expect(saveResult).to.be.an('object');
        expect(saveResult.entity.firstName.value).to.be.equal('Geronimo');
        done();
      });
    });
    it('should return an error if not found', function (done) {
      employee.firstName = 'Geronimo';
      employee.$_entity = null;
      try {
        employee.$save();
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
  });

  describe('$serverRefresh() function', function() {
    it('should act as serverRefresh', function(done) {
      employee.firstName = 'Geronima';
      employee.$serverRefresh().should.be.fulfilled.then(function(refreshResult){
        expect(refreshResult).to.be.an('object');
        expect(refreshResult.entity.firstName.value).to.be.equal('Geronima');
        done();
      });
    });
    it('should return an error if not found', function (done) {
      employee.firstName = 'Geronimo';
      employee.$_entity = null;
      try {
        employee.$serverRefresh();
        Assert.Fail();
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
  });

  describe('$toJSON() function', function() {
    it('should retrieve the JSON of a query', function(done) {
      var employees = $wakanda.$ds.Employee.$find({
        pageSize: 5
      });
      employees.$promise.then(function(){
        var findJson = employees.$toJSON();
        expect(findJson).to.be.a('string');
        expect(JSON.parse(findJson)).to.be.an('array');
        expect(JSON.parse(findJson).length).to.be.equal(5);
        done();
      });
    });
  });

  describe('$_collection function', function() {
    it('should retrieve the collection of a query', function(done) {
      var employees = $wakanda.$ds.Employee.$find({
        pageSize: 5
      });
      employees.$promise.then(function(){
          var findJson = employees.$_collection;
          expect(findJson).to.be.an('object');
          done();
      });
    });
  });

});
