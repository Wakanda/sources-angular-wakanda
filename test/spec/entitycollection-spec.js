describe('Connector/EntityCollection:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
    intervalRef,
    employees,
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
    employees = $wakanda.$ds.Employee.$find({
      filter: 'lastName > :1 && salary > :2',
      params: ['a*', 60000],
      orderBy: 'firstName desc',
      pageSize: 5
    });
    employees.$promise.then(function() {
      done();
    });
  });

  describe('$totalCount variable', function() {
    it('should return number of entities in the collection', function (done) {
      expect(employees.$totalCount).to.be.a('number');
      expect(employees.$totalCount).to.be.gt(0);
      done();
    });
  });

  describe('$query variable', function() {
    it('should have information about the query', function (done) {
      expect(employees.$query.pageSize).to.be.a('number');
      expect(employees.$query.pageSize).to.be.equal(5);
      expect(employees.$query.start).to.be.a('number');
      expect(employees.$query.start).to.be.equal(0);
      expect(employees.$query.filter).to.be.defined;
      done();
    });
  });

  describe('$fetch() function', function() {
    it('should fetch the data', function (done) {
      employees.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should refresh when empty', function (done) {
      employees.$fetch().should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should throw an error when select can\'t be change on a $fetch', function (done) {
      try {
        employees.$fetch({ select: 'staff' });
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
    it('should throw an error when orderBy can\'t be change on a $fetch', function (done) {
      try {
        employees.$fetch({ orderBy: 'firstName asc' });
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
    it('should accept other params like start and params', function (done) {
      employees.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
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
      employees.$fetch({ start: 1, params: ['a*', 5000] },'append').should.be.fulfilled.then(function(fetchResult){
        expect(fetchResult).to.be.an('object');
        done();
      });
    });
    it('should throw an error with unknown modes', function (done) {
      try {
        employees.$fetch({ start: 1 }, 'geronimoMode');
      } catch (Exception) {
        expect(Exception).to.be.an.instanceof(Error);
        done();
      }
    });
  });

  describe('$fetching variable', function() {
    it('should return fetching status', function (done) {
      var employees = $wakanda.$ds.Employee.$find();
      expect(employees.$fetching).to.be.true;
      employees.$promise.then(function() {
        expect(employees.$fetching).to.be.false;
        done();
      });
    });
  });

  describe('$isLoaded() function', function() {
    it('should return the status of a query', function (done) {
      employees.$fetch('employer');
      expect(employees['0'].employer.$isLoaded()).to.be.false;
      done();
    });
  });

  describe('$more() function', function() {
    it('should retrieve more data', function (done) {
      expect(employees.length).to.be.equal(5);
      employees.$more().then(function() {
        expect(employees.length).to.be.equal(10);
        done();
      });
    });
  });

  describe('$nextPage() function', function() {
    it('should retrieve more and different data', function (done) {
        var employees = $wakanda.$ds.Employee.$find({
          pageSize: 10
        });
        employees.$promise.then(function() {
          var employeeFirstPage = employees[0];
          expect(employees.length).to.be.equal(10);
          employees.$nextPage().then(function() {
            var employeeSecondPage = employees[0];
            expect(employees.length).to.be.equal(10);
            expect(employeeFirstPage.firstName).to.be.not.equal(employeeSecondPage.firstName);
            done();
          });
        });
    });
  });

  describe('$prevPage() function', function() {
    it('should retrieve more and different data', function (done) {
      var employees = $wakanda.$ds.Employee.$find({
        pageSize: 10
      });
      employees.$promise.then(function() {
        var employeeFirstPage = employees[0];
        expect(employees.length).to.be.equal(10);
        employees.$nextPage().then(function() {
          var employeeSecondPage = employees[0];
          employees.$prevPage().then(function() {
            var employeeThirdPage = employees[0];
            expect(employees.length).to.be.equal(10);
            expect(employeeFirstPage.firstName).to.be.not.equal(employeeSecondPage.firstName);
            expect(employeeFirstPage.firstName).to.be.equal(employeeThirdPage.firstName);
            done();
          });
        });
      });
    });
  });

  describe('$Entity variable', function() {
    it('should return a $Entity object', function (done) {
      var Entity = $wakanda.$ds.Employee.$Entity;
      expect(Entity).to.be.an('object');
      done();
    });
  });
});
