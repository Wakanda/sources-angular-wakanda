describe('Connector/Dataclass:', function() {
  var $wakanda, $rootScope, $q,
    intervalRef;

  beforeEach(function(){
    module('angularWakandaFrontApp');
    module('unitTestsHelpersModule');
  });

  beforeEach(inject(function(_$rootScope_,_$wakanda_, _$q_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $wakanda = _$wakanda_;
    // https://github.com/domenic/chai-as-promised/issues/68
    intervalRef = setInterval(function(){ $rootScope.$apply(); }, 1);
  }));

  describe('$create() function', function() {
    it('should return the name defined for the datastore class in the Model', function(done) {
      $wakanda.init().then(function(){
        var newPerson = { firstName : "John", lastName : "Smith", salary: 90000 };
        var person = $wakanda.$ds.Employee.$create( newPerson );
        expect(person).to.be.a('object');
        expect(person.firstName).to.be.equal(newPerson.firstName);
        expect(person.lastName).to.be.equal(newPerson.lastName);
        expect(person.salary).to.be.equal(newPerson.salary);
        person.$save().should.notify(done);
      });
    });
  });

  describe('$find() function', function() {
    it('should return the Entity collection of the records found in the Model', function(done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          filter: 'lastName > :1 && salary > :2',
          params: ['a*', 60000],
          orderBy: 'firstName desc',
          pageSize: 20
        });
        setTimeout(function(){
          expect(employees).to.be.an('array');
          expect(employees.length).to.be.equal(20);
          done();
        },250);
      });
    });
  });

  describe('dataClass.$name variable', function() {
    it('should return the name defined for the datastore class in the Model', function(done) {
      $wakanda.init().then(function(){
        var collectionName = $wakanda.$ds.Employee.$name;
        setTimeout(function(){
          expect(collectionName).to.be.a('string');
          expect(collectionName).to.be.equal('Employee');
          done();
        },250);
      });
    });
  });

  describe('dataClass.$collectionName variable', function() {
    it('should return the name defined for the collection of the datastore class in the Model', function(done) {
      $wakanda.init().then(function(){
        var collectionName = $wakanda.$ds.Employee.$collectionName;
        setTimeout(function(){
          expect(collectionName).to.be.a('string');
          expect(collectionName).to.be.equal('EmployeeCollection');
          done();
        },250);
      });
    });
  });

  describe('dataClass.$dataClassMethods() function', function() {
    it('should return the dataclass\'s datastore class methods whose scope is public', function(done) {
      $wakanda.init().then(function(){
        var dataClassMethods = $wakanda.$ds.Employee.$dataClassMethods();
        setTimeout(function(){
          expect(dataClassMethods).to.be.an('array');
          done();
        },250);
      });
    });
  });

  describe('dataClass.$collectionMethods() function', function() {
    it('should return the collection\'s datastore class methods whose scope is public', function(done) {
      $wakanda.init().then(function(){
        var collectionMethods = $wakanda.$ds.Employee.$collectionMethods();
        setTimeout(function(){
          expect(collectionMethods).to.be.an('array');
          $wakanda.$ds.Employee.myDataClassMethod('myDataClassMethod').then(function(e){
            expect(e.result).to.be.defined;
            done();
          });
        },250);
      });
    });
  });

  describe('dataClass.$entityMethods() function', function() {
    it('should return the dataclass\'s entity methods whose scope is public', function(done) {
      $wakanda.init().then(function(){
        var entityMethods = $wakanda.$ds.Employee.$entityMethods();
        setTimeout(function(){
          expect(entityMethods).to.be.an('array');
          done();
        },250);
      });
    });
    it('should return a specific dataclass\'s entity method whose scope is public', function(done) {
      $wakanda.init().then(function(){
        var entityMethods = $wakanda.$ds.Employee.$entityMethods();
        setTimeout(function(){
          expect(entityMethods).to.be.an('array');
          var entityMethod = $wakanda.$ds.Employee.$entityMethods(entityMethods[0]);
          setTimeout(function(){
            expect(entityMethod).to.be.an('array');
            done();
          },250);
        },250);
      });
    });
  });

  describe('dataClass.$attr(name) function', function() {
    it('should return an attribute from a dataclass', function(done) {
      $wakanda.init().then(function(){
        var dataClassAttribute = $wakanda.$ds.Employee.$attr('firstName');
        setTimeout(function(){
          expect(dataClassAttribute).to.be.an('object');
          expect(dataClassAttribute.name).to.be.equal('firstName');
          done();
        },250);
      });
    });
    it('should return an null when attribute from a dataclass is not found', function(done) {
      $wakanda.init().then(function(){
        var dataClassAttribute = $wakanda.$ds.Employee.$attr('geronimo');
        setTimeout(function(){
          expect(dataClassAttribute).to.be.null;
          done();
        },250);
      });
    });
    it('should return all the attributes when no (name) is specified', function(done) {
      $wakanda.init().then(function(){
        var dataClassAttribute = $wakanda.$ds.Employee.$attr();
        setTimeout(function(){
          expect(dataClassAttribute).to.be.an('object');
          done();
        },250);
      });
    });
  });

  describe('dataClass.$_relatedAttributes(name) function', function() {
    it('should return the related attributes from a dataclass', function(done) {
      $wakanda.init().then(function(){
        var _relatedAttributes = $wakanda.$ds.Employee.$_relatedAttributes;
        setTimeout(function(){
          expect(_relatedAttributes).to.be.an('array');
          done();
        },250);
      });
    });
  });

  describe('dataClass.$_processedAttributes(name) variable', function() {
    it('should return the processed attributes from a dataclass', function(done) {
      $wakanda.init().then(function(){
        var _processedAttributes = $wakanda.$ds.Employee.$_processedAttributes;
        setTimeout(function(){
          expect(_processedAttributes).to.be.an('array');
          done();
        },250);
      });
    });
  });

  afterEach(function() {
    $wakanda = $rootScope = null;
    clearInterval(intervalRef);
  });
});