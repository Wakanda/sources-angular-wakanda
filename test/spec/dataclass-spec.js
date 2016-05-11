describe('Connector/Dataclass:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
  intervalRef,
  employees, employee,
  ds;

  before(function () {
    module('unitTestsHelpersModule');
    inject(function (_unitTestsHelpers_) {
      unitTestsHelpers = _unitTestsHelpers_;
      unitTestsHelpers.db.reset(false);
    });
  });

  beforeEach(function() {
    if(!$wakanda) {
      module('wakanda');
      inject(function(_$rootScope_, _$wakanda_, _$q_) {
          $q = _$q_;
          $rootScope = _$rootScope_;
          $wakanda = _$wakanda_;
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

  describe('$create() function', function() {
    it('should return the name defined for the datastore class in the Model', function(done) {
      var newPerson = { firstName : "John", lastName : "Smith", salary: 90000 };
      var person = $wakanda.$ds.Employee.$create( newPerson );
      expect(person).to.be.a('object');
      expect(person.firstName).to.be.equal(newPerson.firstName);
      expect(person.lastName).to.be.equal(newPerson.lastName);
      expect(person.salary).to.be.equal(newPerson.salary);
      person.$save().should.notify(done);
    });

    it('should link a related entity to newly created one if passed on parameter', function (done) {
      ds.Company.$all().$promise.then(function (e) {
        var company = e.result[0];

        var newEmployee = ds.Employee.$create({
          firstName: 'Jonh',
          lastName: 'Smith',
          salary: 68000,
          employer: company
        });

        newEmployee.$save().$promise.then(function () {
          expect(newEmployee).to.be.an('object');
          expect(newEmployee.firstName).to.be.equal('Jonh');
          expect(newEmployee.lastName).to.be.equal('Smith');
          expect(newEmployee.salary).to.be.equal(68000);
          expect(newEmployee.employer).to.be.an('object');
          expect(newEmployee.employer.ID).to.be.equal(company.ID);

          done();
        });
      });
    });
  });

  describe('$query() function', function() {
    it('should return the Entity collection of the records found in the Model', function(done) {
      employees = $wakanda.$ds.Employee.$query({
        filter: 'lastName > :1 && salary > :2',
        params: ['a*', 60000],
        orderBy: 'firstName desc',
        pageSize: 20
      });
      employees.$promise.then(function() {
        expect(employees).to.be.an('array');
        expect(employees.length).to.be.equal(20);
        done();
      });
    });

    it('should return a promise on $promise property', function (done) {
      employees = $wakanda.$ds.Employee.$query({
        filter: 'lastName > :1 && salary > :2',
        params: ['a*', 60000],
        orderBy: 'firstName desc',
        pageSize: 20
      });

      var promise = employees.$promise;
      expect(employees).to.have.property('$promise');
      expect(promise).to.be.an('object');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
  });

  describe('$all() function', function () {

    beforeEach(function () {
      employees = $wakanda.$ds.Employee.$all({
        pageSize: 50
      });
    });

    it('should return all entities of the records found in the Model', function (done) {
      employees.$promise.then(function () {
        expect(employees).to.be.an('array');
        expect(employees.length).to.be.a('number');
        expect(employees.length).to.be.gt(0);
        done();
      });
    });

    it('should be paginated', function (done) {
      employees.$promise.then(function () {
        expect(employees.length).to.be.equal(50);
        expect(employees.$nextPage).to.be.a('function');
        expect(employees.$prevPage).to.be.a('function');
        done();
      });
    });
  });

  describe('dataClass.$name variable', function() {
    it('should return the name defined for the datastore class in the Model', function(done) {
      var collectionName = $wakanda.$ds.Employee.$name;
      expect(collectionName).to.be.a('string');
      expect(collectionName).to.be.equal('Employee');
      done();
    });
  });

  describe('dataClass.$collectionName variable', function() {
    it('should return the name defined for the collection of the datastore class in the Model', function(done) {
      var collectionName = $wakanda.$ds.Employee.$collectionName;
      expect(collectionName).to.be.a('string');
      expect(collectionName).to.be.equal('EmployeeCollection');
      done();
    });
  });

  describe('dataClass.$dataClassMethods() function', function() {
    it('should return the dataclass\'s datastore class methods whose scope is public', function(done) {
      var dataClassMethods = $wakanda.$ds.Employee.$dataClassMethods();
      expect(dataClassMethods).to.be.an('array');
      done();
    });

    it('should return a promise on $promise property', function (done) {
      var request = $wakanda.$ds.Employee.myDataClassMethod();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.an('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
  });

  describe('dataClass.$collectionMethods() function', function() {
    it('should return the collection\'s datastore class methods whose scope is public', function(done) {
      var collectionMethods = $wakanda.$ds.Employee.$collectionMethods();
      expect(collectionMethods).to.be.an('array');
      $wakanda.$ds.Employee.myDataClassMethod('myDataClassMethod').then(function(e){
        expect(e.result).to.be.defined;
        done();
      });
    });

    it('should return a promise on $promise property', function (done) {
      $wakanda.$ds.Employee.$query().$promise.then(function(event) {
        var request = event.result.myCollectionMethod();
        var promise = request.$promise;

        expect(request).to.have.property('$promise');
        expect(promise.then).to.be.a('function');
        expect(promise.catch).to.be.a('function');

        done();
      });
    });
  });

  describe('dataClass.$entityMethods() function', function() {
    it('should return the dataclass\'s entity methods whose scope is public', function(done) {
      var entityMethods = $wakanda.$ds.Employee.$entityMethods();
      expect(entityMethods).to.be.an('array');
      done();
    });
    it('should return a specific dataclass\'s entity method whose scope is public', function(done) {
      var entityMethods = $wakanda.$ds.Employee.$entityMethods();
      expect(entityMethods).to.be.an('array');
      var entityMethod = $wakanda.$ds.Employee.$entityMethods(entityMethods[0]);
      expect(entityMethod).to.be.an('array');
      done();
    });
    it('should return a promise on $promise property', function (done) {
      $wakanda.$ds.Employee.$query().$promise.then(function(event) {
        var request = event.result[0].myEntityMethod();
        var promise = request.$promise;

        expect(request).to.have.property('$promise');
        expect(promise.then).to.be.a('function');
        expect(promise.catch).to.be.a('function');

        done();
      });
    });
  });

  describe('dataClass.$attr(name) function', function() {
    it('should return an attribute from a dataclass', function(done) {
      var dataClassAttribute = $wakanda.$ds.Employee.$attr('firstName');
      expect(dataClassAttribute).to.be.an('object');
      expect(dataClassAttribute.name).to.be.equal('firstName');
      done();
    });
    it('should return an null when attribute from a dataclass is not found', function(done) {
      var dataClassAttribute = $wakanda.$ds.Employee.$attr('geronimo');
      expect(dataClassAttribute).to.be.null;
      done();
    });
    it('should return all the attributes when no (name) is specified', function(done) {
      var dataClassAttribute = $wakanda.$ds.Employee.$attr();
      expect(dataClassAttribute).to.be.an('object');
      done();
    });
  });
});
