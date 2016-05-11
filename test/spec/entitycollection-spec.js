describe('Connector/EntityCollection:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
    intervalRef,
    employees,
    ds;

  beforeEach(function() {
    if(!$wakanda) {
      module('wakanda');
      module('unitTestsHelpersModule');
      inject(function(_$rootScope_, _$wakanda_, _$q_, _unitTestsHelpers_) {
          $q = _$q_;
          $rootScope = _$rootScope_;
          $wakanda = _$wakanda_;
          unitTestsHelpers = _unitTestsHelpers_;
          unitTestsHelpers.db.reset(false);
          // https://github.com/domenic/chai-as-promised/issues/68
          // intervalRef = setInterval(function(){ $rootScope.$apply(); }, 1);
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
    employees = $wakanda.$ds.Employee.$query({
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

  describe('$queryParams variable', function() {
    it('should have information about the query', function (done) {
      expect(employees.$queryParams.pageSize).to.be.a('number');
      expect(employees.$queryParams.pageSize).to.be.equal(5);
      expect(employees.$queryParams.start).to.be.a('number');
      expect(employees.$queryParams.start).to.be.equal(0);
      done();
    });
  });

  describe('$fetch() function', function() {
    it('should return a promise on $promise property', function (done) {
      var request = employees.$fetch({ start: 1, params: ['a*', 5000] });
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
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
  });

  describe('$more() function', function() {
    it('should retrieve more data', function (done) {
      expect(employees.length).to.be.equal(5);
      employees.$more().then(function() {
        expect(employees.length).to.be.equal(10);
        done();
      });
    });
    it('should return a promise on $promise property', function (done) {
      var request = employees.$more();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
  });

  describe('$nextPage() function', function() {
    it('should retrieve more and different data', function (done) {
        employees = $wakanda.$ds.Employee.$query({
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
    it('should return a promise on $promise property', function (done) {
      var request = employees.$nextPage();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
  });

  describe('$prevPage() function', function() {
    it('should retrieve more and different data', function (done) {
      employees = $wakanda.$ds.Employee.$query({
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
    it('should return a promise on $promise property', function (done) {
      var request = employees.$prevPage();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
  });

  describe('$query with selecting related entity and related entities', function() {
    it('should fetch the related entities', function (done) {
      $wakanda.$ds.Employee.$query({ select: 'employer.staff' }).$promise.then(function(e) {
        expect(e.result[2].employer.staff[0].firstName).to.be.a('string');
        done();
      });
    });
  });

  describe('$toJSON() function', function() {
    it('should retrieve the JSON of a collection', function(done) {
      employees = $wakanda.$ds.Employee.$query({
        pageSize: 10
      });
      employees.$promise.then(function() {
        var employeesJson = employees.$toJSON();
        expect(employeesJson).to.be.a('string');
        expect(JSON.parse(employeesJson)).to.be.an('array');
        expect(JSON.parse(employeesJson)[0].ID).to.be.equal(employees[0].ID);
        done();
      });
    });
  });

  describe('user defined collection methods', function () {
    it('should be defined for root collections', function (done) {
      var employees = ds.Employee.$all().$promise.then(function (e) {
        expect(e.result.myCollectionMethod).to.be.a('function');
        done();
      })
    });

    it('should be defined for expanded collections', function (done) {
      ds.Company.$query({pageSize: 3, select: 'staff'}).$promise.then(function (e) {
        var companies = e.result;
        expect(companies[0].staff.myCollectionMethod).to.be.a('function');
        done();
      });
    });

    it('should be defined for fetched collections', function (done) {
      ds.Company.$query().$promise.then(function (e) {
        var company = e.result[0];
        company.staff.$fetch().$promise.then(function () {
          expect(company.staff.myCollectionMethod).to.be.a('function');
          done();
        });
      });
    });

    it('should return the right value for root collections', function (done) {
      ds.Employee.$query({filter: 'salary > 95000'}).$promise.then(function (e) {
        e.result.myCollectionMethod().$promise.then(function (ee) {
          expect(ee.result).to.be.equal("Hello from collection employee ! There is " + e.result.$totalCount + " items on the collection.");
          done();
        });
      });
    });

    it('should return the right value for expanded collections', function (done) {
      ds.Company.$query({pageSize: 3, select: 'staff'}).$promise.then(function (e) {
        var company = e.result[0];
        company.staff.myCollectionMethod().$promise.then(function (ee) {
          expect(ee.result).to.be.equal("Hello from collection employee ! There is " + company.staff.$totalCount + " items on the collection.");
          done();
        });
      });
    });

    it('should return the right value for fetched collections', function (done) {
      ds.Company.$query({pageSize: 3}).$promise.then(function (e) {
        var company = e.result[0];
        company.staff.$fetch().$promise.then(function () {
          company.staff.myCollectionMethod().$promise.then(function (ee) {
            expect(ee.result).to.be.equal("Hello from collection employee ! There is " + company.staff.$totalCount + " items on the collection.");
            done();
          });
        });
      });
    });

    it('should return an entity if the method returns one', function (done) {
      ds.Employee.oneEmployee().$promise.then(function (e) {

        var ngEntity = e.result;

        expect(ngEntity.$fetch).to.be.a('function');
        expect(ngEntity.$isNew).to.be.a('function');
        expect(ngEntity.$key).to.be.a('function');
        expect(ngEntity.$remove).to.be.a('function');
        expect(ngEntity.$save).to.be.a('function');
        expect(ngEntity.$stamp).to.be.a('function');
        expect(ngEntity.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should return a collection if the method returns one', function (done) {
      ds.Employee.lotsOfEmployees().$promise.then(function (e) {
        var ngCollection = e.result;

        expect(ngCollection).to.be.an('array');

        expect(ngCollection.$fetch).to.be.a('function');
        expect(ngCollection.$more).to.be.a('function');
        expect(ngCollection.$nextPage).to.be.a('function');
        expect(ngCollection.$prevPage).to.be.a('function');
        expect(ngCollection.$totalCount).to.be.a('number');
        expect(ngCollection.$toJSON).to.be.a('function');
        done();
      });
    });
  });
});
