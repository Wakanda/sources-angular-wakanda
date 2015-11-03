describe('Connector/Dataclass:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
  intervalRef,
  employees, employee,
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

  describe('dataClass.$_relatedAttributes(name) function', function() {
    it('should return the related attributes from a dataclass', function(done) {
      var _relatedAttributes = $wakanda.$ds.Employee.$_relatedAttributes;
      expect(_relatedAttributes).to.be.an('array');
      done();
    });
  });

  describe('dataClass.$_processedAttributes(name) variable', function() {
    it('should return the processed attributes from a dataclass', function(done) {
      var _processedAttributes = $wakanda.$ds.Employee.$_processedAttributes;
      expect(_processedAttributes).to.be.an('array');
      done();
    });
  });
});
