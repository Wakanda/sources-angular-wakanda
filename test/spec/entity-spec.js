describe('Connector/Entity:', function() {
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
    employees = ds.Employee.$query();
    employees.$promise.then(function() {
      employees.some(function(_employee) {
        if(_employee.employer) {
          employee = _employee;
          return true;
        }
      });
      done();
    });
  });

  describe('$find() function', function() {

    it('should return a promise on $promise property', function (done) {
      employee2 = ds.Employee.$find(employee.ID);

      var promise = employee2.$promise;
      expect(employee2).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });

    it('should find an entity', function (done) {
      var employee2 = ds.Employee.$find(employee.ID);
      employee2.$promise.then(function() {
        expect(employee2.ID).to.be.equal(parseInt(employee.ID));
        expect(employee2.ID).to.be.equal(parseInt(employee2.$key()));
        done();
      });
    });
    it('should return an error if not found', function (done) {
      // employee = ds.Employee.$find(-404).$promise.should.be.rejected.then(function() {
      //   done();
      // });
      ds.Employee.$find(-404).$promise.catch(function (e) {
        expect(e).to.be.defined;
        done();
      });
      $rootScope.$apply();
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
    it('should provide $stamp method', function (done) {
      expect(employee.$stamp()).to.be.a('number');
      done();
    });
    it('should return undefined when no entity is defined', function (done) {
      employee.$_entity = null;
      expect(employee.$stamp()).to.be.undefined;
      done();
    });
    it('should not expand related attribute without select option', function (done) {
      ds.Employee.$find(employee.ID).$promise.then(function (e) {
        var expandedEmployee = e.result;

        expect(expandedEmployee).to.be.defined;
        expect(expandedEmployee.employer).to.be.defined;
        expect(expandedEmployee.employer.name).to.be.null;
        done();
      });
    });
    it('should expand keys given on select option', function (done) {
      ds.Employee.$find(employee.ID, {select: 'employer'}).$promise.then(function (e) {
        var expandedEmployee = e.result;

        expect(expandedEmployee).to.be.defined;
        expect(expandedEmployee.employer).to.be.defined;
        expect(expandedEmployee.employer.name).to.be.defined;
        done();
      });
    });
  });

  describe('$isNew() function', function () {
    it('should be defined', function () {
      expect(employee.$isNew).to.be.a('function');
    });
    it('should return true if the entity is created and not saved', function () {
      var entity = ds.Employee.$create();
      expect(entity.$isNew()).to.be.true;
    });
    it('should return false if the entity come from the server', function () {
      expect(employee.$isNew()).to.be.false;
    });
  });

  describe('$fetch() function', function() {

    it('should return a promise on $promise property', function (done) {
      var request = employee.$fetch({start: 1, params: ['a*', 5000]});

      var promise = request.$promise;
      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });

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

  describe('$isDeferred() function', function() {
    it('should be defined', function () {
      expect(employee.$isDeferred).to.be.a('function');
    });
    it('should return false if the entity is fetched', function () {
      expect(employee.$isDeferred()).to.be.false;
    });
    it('should return true is the entity is deferred', function () {
      expect(employee.employer.$isDeferred()).to.be.true;
    });
  });

  describe('$remove() function', function() {

    it('should return a promise on $promise property', function (done) {
      var employeeToRemove = employees[3]; //3 to avoid deleting the entity the will be deleted by the next test
      var request = employeeToRemove.$remove();

      var promise = request.$promise;
      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });

    it('should remove an entity', function (done) {
      var employeeToRemove = employees[4];
      employees[4].$remove().should.be.fulfilled.then(function(removeResult){
        expect(removeResult).to.be.an('object');
        employees = ds.Employee.$query();
        employees.$promise.then(function() {
          expect(employees[4]).to.be.not.equal(employeeToRemove);
          done();
        });
      });
    });
    it('should return an error if not found', function (done) {
      var employeeToRemove = employees[0];
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

    it('should return a promise on $promise property', function (done) {
      var newPerson = { firstName : "John", lastName : "Smith", salary: 90000 };
      var person = ds.Employee.$create( newPerson );
      var request = person.$save();

      var promise = request.$promise;
      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });

    it('should save a created entity', function(done) {
      var newPerson = { firstName : "John", lastName : "Smith", salary: 90000 };
      var person = ds.Employee.$create( newPerson );
      person.$save().should.be.fulfilled.then(function(saveResult) {
        expect(saveResult).to.be.an('object');
        expect(person.firstName).to.be.equal(newPerson.firstName);
        done();
      });
    });
    it('should update an existing entity', function(done) {
      employee.firstName = 'Geronimo';
      employee.$save().should.be.fulfilled.then(function(saveResult) {
        expect(saveResult).to.be.an('object');
        expect(employee.firstName).to.be.equal('Geronimo');
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
    it('should successfuly update an object attribute', function (done) {
      ds.Product.$all().$promise.then(function (e) {
        var product = e.result[0];

        product.spec = {foo: 'bar'};
        product.$save().$promise.then(function () {
          expect(product.spec).to.be.an('object');
          expect(product.spec.foo).to.be.equal('bar');

          product.spec.baz = 1136;
          product.$save().$promise.then(function () {
            expect(product.spec).to.be.an('object');
            expect(product.spec.baz).to.be.equal(1136);
            done();
          });
        });
      });
    });

    it('should update only changed attributes', function (done) {
      ds.Employee.$all().$promise.then(function (e) {
        var employee = e.result[0];
        var oldStamp = employee.$_entity._stamp;
      
        return employee.$save().$promise.then(function () {
          expect(employee.$_entity._stamp).to.be.equal(oldStamp);
          done();
        });
      });
    });
  });

  describe('$toJSON() function', function() {
    it('should return the JSON of an entity', function() {
      var employeeJson = employee.$toJSON();
      expect(employeeJson).to.be.a('string');
      expect(JSON.parse(employeeJson)).to.be.an('object');
      expect(JSON.parse(employeeJson).ID).to.be.equal(employee.ID);
      var evalJson = eval('(' + JSON.stringify(employee) + ')');
      expect(evalJson).to.be.deep.equal(JSON.parse(employeeJson));
      expect(evalJson.length).to.be.equal(JSON.parse(employeeJson).length);
    });

    it('should also retrieve the JSON of the related after fetch entity', function(done) {
      ds.Employee.$query({
        filter: 'employer.ID > 0',
        pageSize: 1,
        select: 'employer'
      }).$promise.then(function (e) {
        var employee = e.result[0];
        var employeeJson = employee.$toJSON();
        var employeeJsonObject = JSON.parse(employeeJson);
        expect(employeeJsonObject.employer.ID).to.be.a('number');
        expect(employeeJsonObject.employer.name).to.be.a('string');
        done();
      });
    });
    it('should also retrieve the JSON of the related after fetch a related entity', function(done) {
      employee = employees[2];
      employee.employer.$fetch().then(function() {
        employee.employer.staff.$fetch().then(function() {
          var employeeJson = employee.$toJSON();
          var employeeJsonObject = JSON.parse(employeeJson);
          expect(employeeJsonObject.employer.staff).to.be.an('array');
          done();
        });
      });
    });
  });

  describe('$_collection function', function() {
    it('should retrieve the collection of a query', function(done) {
      employees = ds.Employee.$query({
        pageSize: 5
      });
      employees.$promise.then(function(){
          var findJson = employees.$_collection;
          expect(findJson).to.be.an('object');
          done();
      });
    });
  });

  describe('$fetch on related entity', function() {
    it('should return null if not fetched', function(done) {
      expect(employees[2].employer.ID).to.be.null;
      done();
    });

   it('should return a value', function(done) {
     employees[2].employer.$fetch().then(function() {
       expect(employees[2].employer.ID).to.not.equal(undefined);
       done();
     });
   });

   it('should return a promise on $promise property', function (done) {
     var request = employee.employer.$fetch();

     var promise = request.$promise;
     expect(request).to.have.property('$promise');
     expect(promise.then).to.be.a('function');
     expect(promise.catch).to.be.a('function');

     done();
   });

  });

  describe('setter on related entity', function() {
    it('should update the related entity before and after $save', function(done) {
      employee.employer.$fetch().then(function() {
        var companies = ds.Company.$query({ filter: 'ID != :1', params: [ employee.employer.ID ] });
        companies.$promise.then(function() {
          var company = companies[0];
          expect(employee.employer.ID).to.not.equal(company.ID);

          employee.employer = company;
          expect(employee.employer.ID).to.be.equal(company.ID);

          employee.$save().then(function() {
            expect(employee.employer.ID).to.be.equal(company.ID);
            done();
          });
        });
      });
    });
  });

  describe('$recompute method', function () {

    var product;
    beforeEach(function (done) {
      ds.Product.$query({pageSize: 1}).$promise.then(function (e) {
        product = e.result[0];
        done();
      });
    });

    it('should be defined', function () {
      expect(product.$recompute).to.be.a('function');
    });

    it('should return a promise', function () {
      var p = product.$recompute();
      expect(p).to.be.defined;
      expect(p.then).to.be.a('function');
      expect(p.catch).to.be.a('function');
    });

    it('should return a promise on $promise property', function () {
      var p = product.$recompute().$promise;
      expect(p).to.be.defined;
      expect(p.then).to.be.a('function');
      expect(p.catch).to.be.a('function');
    });

    it('should edit the entity in place', function () {
      var entity = ds.Product.$create();
      return entity.$recompute().$promise.then(function (e) {
        expect(e.result).to.be.equal(entity);
      });
    });

    it('should fire init event for a newly created entity', function () {
      var entity = ds.Product.$create();
      return entity.$recompute().$promise.then(function () {
        expect(entity.myBoolean).to.be.true;
      });
    });

    it('should fire clientrefresh event for a newly created entity', function () {
      var entity = ds.Product.$create();
      return entity.$recompute().$promise.then(function () {
        expect(entity.name).to.be.equal('Unnamed product');
      });
    });

    it('should fire clientrefresh event for an already saved entity', function () {
      product.name = null;
      return product.$recompute().$promise.then(function () {
        expect(product.name).to.be.equal('Unnamed product');
      });
    });

    it('should not cause any trouble to saving after being called', function () {
      var oldStamp = product.$stamp();

      product.name = null;
      return product.$recompute().$promise.then(function () {
        return product.$save().$promise.then(function () {
          expect(product.$stamp()).to.be.above(oldStamp);
          expect(product.name).to.be.equal('Unnamed product');
        });
      });
    });
  });
});
