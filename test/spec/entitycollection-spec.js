describe('Connector/EntityCollection:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
    intervalRef;

  beforeEach(function(){
    module('wakanda');
    module('unitTestsHelpersModule');
  });

  beforeEach(inject(function(_$rootScope_, _$wakanda_, _$q_, _unitTestsHelpers_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $wakanda = _$wakanda_;
    unitTestsHelpers = _unitTestsHelpers_;
    unitTestsHelpers.db.reset(false);
    // https://github.com/domenic/chai-as-promised/issues/68
    intervalRef = setInterval(function(){ $rootScope.$apply(); }, 1);
  }));

  describe('$totalCount variable', function() {
    it('should return number of entities in the collection', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          expect(employees.$totalCount).to.be.a('number');
          expect(employees.$totalCount).to.be.gt(0);
          done();
        },250);
      });
    });
  });

  describe('$query variable', function() {
    it('should have information about the query', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          expect(employees.$query.pageSize).to.be.a('number');
          expect(employees.$query.pageSize).to.be.equal(5);
          expect(employees.$query.start).to.be.a('number');
          expect(employees.$query.start).to.be.equal(0);
          expect(employees.$query.filter).to.be.defined;
          done();
        },250);
      });
    });
  });

  describe('$fetch() function', function() {
    it('should fetch the data', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          employees.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
        },250);
      });
    });
    it('should refresh when empty', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          employees.$fetch().should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
        },250);
      });
    });
    it('should throw an error when select can\'t be change on a $fetch', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          try {
            employees.$fetch({ select: 'staff' });
            Assert.Fail();
          } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
            done();
          }
        },250);
      });
    });
    it('should throw an error when orderBy can\'t be change on a $fetch', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          try {
            employees.$fetch({ orderBy: 'firstName asc' });
            Assert.Fail();
          } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
            done();
          }
        },250);
      });
    });
    it('should accept other params like start and params', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          employees.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
        },250);
      });
    });
    it('should work in replace mode', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          employees.$fetch({ start: 1, params: ['a*', 5000] },'replace').should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
        },250);
      });
    });
    it('should work in append mode', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          employees.$fetch({ start: 1, params: ['a*', 5000] },'append').should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
        },250);
      });
    });
    it('should throw an error with unknown modes', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          try {
            employees.$fetch({ start: 1 },'geronimoMode');
            Assert.Fail();
          } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
            done();
          }
        },250);
      });
    });
  });

  describe('$fetching variable', function() {
    it('should return an Entity relation', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 500
        });
        expect(employees.$fetching).to.be.true;
        setTimeout(function(){
          expect(employees.$fetching).to.be.false;
          done();
        },500);
      });
    });
  });

  describe('$isLoaded() function', function() {
    it('should return the status of a query', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          employees.$fetch('employer');
          expect(employees['0'].employer.$isLoaded()).to.be.false;
          done();
        },250);
      });
    });
  });

  describe('$more() function', function() {
    it('should retrieve more data', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 5
        });
        setTimeout(function(){
          expect(employees.length).to.be.equal(5);
          employees.$more();
          setTimeout(function(){
            expect(employees.length).to.be.equal(10);
            done();
          },500);
        },250);
      });
    });
  });

  describe('$nextPage() function', function() {
    it('should retrieve more and different data', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          pageSize: 10
        });
        setTimeout(function(){
          var employeeFirstPage = employees[0];
          expect(employees.length).to.be.equal(10);
          employees.$nextPage();
          setTimeout(function(){
            var employeeSecondPage = employees[0];
            expect(employees.length).to.be.equal(10);
            expect(employeeFirstPage.firstName).to.be.not.equal(employeeSecondPage.firstName);
            done();
          },500);
        },250);
      });
    });
  });

  describe('$prevPage() function', function() {
    it('should retrieve more and different data', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          pageSize: 10
        });
        setTimeout(function(){
          var employeeFirstPage = employees[0];
          expect(employees.length).to.be.equal(10);
          employees.$nextPage();
          setTimeout(function(){
            var employeeSecondPage = employees[0];
            employees.$prevPage();
            setTimeout(function(){
              var employeeThirdPage = employees[0];
              expect(employees.length).to.be.equal(10);
              expect(employeeFirstPage.firstName).to.be.not.equal(employeeSecondPage.firstName);
              expect(employeeFirstPage.firstName).to.be.equal(employeeThirdPage.firstName);
              done();
            },500);
          },500);
        },250);
      });
    });
  });

  describe('$Entity variable', function() {
    it('should return a $Entity object', function (done) {
      $wakanda.init().then(function(){
        var Entity = $wakanda.$ds.Employee.$Entity;
        setTimeout(function(){
          expect(Entity).to.be.an('object');
          done();
        },150);
      });
    });
  });

  afterEach(function() {
    $wakanda = $rootScope = null;
    clearInterval(intervalRef);
  });
});