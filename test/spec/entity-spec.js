describe('Connector/Entity:', function() {
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

  describe('$findOne() function', function() {
    it('should find an entity', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            expect(employee.ID).to.be.equal(parseInt(employee.$key()));
            done();
          },250);
        },250);
      });
    });
    it('should return an error if not found', function (done) {
      $wakanda.init().then(function(ds){
        try {
          ds.Employee.$findOne({filter: 'firstName = "abc"'});
          Assert.Fail();
        } catch (Exception) {
          expect(Exception).to.be.an.instanceof(Error);
          done();
        }
      });
    });
    it('should provide $key method', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            expect(employee.ID).to.be.equal(parseInt(employee.$key()));
            done();
          },250);
        },250);
      });
    });
    it('should return undefined when no entity is defined', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$_entity = null;
            expect(employee.$key()).to.be.undefined;
            done();
          },250);
        },250);
      });
    });
    it('should return key when no entity is defined but we have key', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$_entity = null;
            employee.$_key = '123';
            expect(employee.$key()).to.be.equal('123');
            done();
          },250);
        },250);
      });
    });
    it('should provide $stamp method', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            expect(employee.$stamp()).to.be.a('number');
            done();
          },250);
        },250);
      });
    });
    it('should return undefined when no entity is defined', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$_entity = null;
            expect(employee.$stamp()).to.be.undefined;
            done();
          },250);
        },250);
      });
    });
    it('should provide $isNew method', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            expect(employee.$isNew()).to.be.a('boolean');
            done();
          },250);
        },250);
      });
    });
    it('should return undefined when no entity is defined', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$_entity = null;
            expect(employee.$isNew()).to.be.undefined;
            done();
          },250);
        },250);
      });
    });
  });

  describe('$fetch() function', function() {
    it('should fetch the data', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
             employee.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
              expect(fetchResult).to.be.an('object');
              done();
            },250);
          });
        },250);
      });
    });
    it('should refresh when empty', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$fetch().should.be.fulfilled.then(function(fetchResult){
              expect(fetchResult).to.be.an('object');
              done();
            });
          },250);
        },250);
      });
    });
    it('should throw an error when select can\'t be change on a $fetch', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            try {
              employee.$fetch({ select: 'staff' });
              Assert.Fail();
            } catch (Exception) {
              expect(Exception).to.be.an.instanceof(Error);
              done();
            }
          },250);
        },250);
      });
    });
    it('should throw an error when orderBy can\'t be change on a $fetch', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          setTimeout(function(){
            var employee = ds.Employee.$findOne(employees['0'].ID);
            try {
              employee.$fetch({ orderBy: 'firstName asc' });
              Assert.Fail();
            } catch (Exception) {
              expect(Exception).to.be.an.instanceof(Error);
              done();
            }
          },250);
        },250);
      });
    });
    it('should accept other params like start and params', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$fetch({ start: 1, params: ['a*', 5000] }).should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
          },250);
        },250);
      });
    });
    it('should work in replace mode', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
          employees.$fetch({ start: 1, params: ['a*', 5000] },'replace').should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
          },250);
        },250);
      });
    });
    it('should work in append mode', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            employee.$fetch({ start: 1, params: ['a*', 5000] },'append').should.be.fulfilled.then(function(fetchResult){
            expect(fetchResult).to.be.an('object');
            done();
          });
          },250);
        },250);
      });
    });
    it('should throw an error with unknown modes', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            try {
              employee.$fetch({ start: 1 },'geronimoMode');
              Assert.Fail();
            } catch (Exception) {
              expect(Exception).to.be.an.instanceof(Error);
              done();
            }
          },250);
        },250);
      });
    });
  });

  describe('$isLoaded() function', function() {
    it('should return the status of a query', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employee = ds.Employee.$findOne(employees['0'].ID);
          setTimeout(function(){
            expect(employee.$isLoaded()).to.be.true;
            done();
          },250);
        },250);
      });
    });
  });

  describe('$remove() function', function() {
    it('should remove an entity', function (done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employeeToRemove = employees['0'];
          employees['0'].$remove().should.be.fulfilled.then(function(removeResult){
            expect(removeResult).to.be.an('object');
            employees = $wakanda.$ds.Employee.$find();
            setTimeout(function(){
              expect(employees['0']).to.be.not.deep.equal(employeeToRemove);
              done();
            },250);
          });
        },250);
      });
    });
    it('should return an error if not found', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          var employeeToRemove = employees['0'];
          employeeToRemove.$_entity = null;
          try {
            employeeToRemove.$remove();
            Assert.Fail();
          } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
            done();
          }
        },250);
      });
    });
  });

  describe('$save() function', function() {
    it('should save a created entity', function(done) {
      $wakanda.init().then(function(){
        var newPerson = { firstName : "John", lastName : "Smith", salary: 90000 };
        var person = $wakanda.$ds.Employee.$create( newPerson );
        setTimeout(function(){
          person.$save().should.be.fulfilled.then(function(saveResult){
            expect(saveResult).to.be.an('object');
            expect(person.firstName).to.be.equal(saveResult.entity.firstName.value);
            done();
          });
        },250);
      });
    });
    it('should update an existing entity', function(done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          employees['0'].firstName = 'Geronimo';
          employees['0'].$save().should.be.fulfilled.then(function(saveResult){
            expect(saveResult).to.be.an('object');
            expect(saveResult.entity.firstName.value).to.be.equal('Geronimo');
            done();
          });
        },250);
      });
    });
    it('should return an error if not found', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          employees['0'].firstName = 'Geronimo';
          employees['0'].$_entity = null;
          try {
            employees['0'].$save();
            Assert.Fail();
          } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
            done();
          }
        },250);
      });
    });
  });

  describe('$serverRefresh() function', function() {
    it('should act as serverRefresh', function(done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          employees['0'].firstName = 'Geronima';
          employees['0'].$serverRefresh().should.be.fulfilled.then(function(refreshResult){
            expect(refreshResult).to.be.an('object');
            expect(refreshResult.entity.firstName.value).to.be.equal('Geronima');
            done();
          });
        },250);
      });
    });
    it('should return an error if not found', function (done) {
      $wakanda.init().then(function(ds){
        var employees = $wakanda.$ds.Employee.$find();
        setTimeout(function(){
          employees['0'].firstName = 'Geronimo';
          employees['0'].$_entity = null;
          try {
            employees['0'].$serverRefresh();
            Assert.Fail();
          } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
            done();
          }
        },250);
      });
    });
  });

  describe('$toJSON() function', function() {
    it('should retrieve the JSON of a query', function(done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          pageSize: 5
        });
        setTimeout(function(){
          var findJson = employees.$toJSON();
          expect(findJson).to.be.a('string');
          expect(JSON.parse(findJson)).to.be.an('array');
          expect(JSON.parse(findJson).length).to.be.equal(5);
          done();
        },250);
      });
    });
  });

  describe('$_collection function', function() {
    it('should retrieve the collection of a query', function(done) {
      $wakanda.init().then(function(){
        var employees = $wakanda.$ds.Employee.$find({
          pageSize: 5
        });
        setTimeout(function(){
          var findJson = employees.$_collection;
          expect(findJson).to.be.an('object');
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