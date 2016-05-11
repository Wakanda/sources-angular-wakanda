describe('Connector/Trasnform :', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers, intervalRef, ds;

  before(function () {
    module('unitTestsHelpersModule');
    inject(function (_unitTestsHelpers_) {
      unitTestsHelpers = _unitTestsHelpers_;
      unitTestsHelpers.db.reset(false);
    });
  });

  beforeEach(function() {
    if (!$wakanda) {
      module('wakanda');
      inject(function(_$rootScope_, _$wakanda_, _$q_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $wakanda = _$wakanda_;
        // https://github.com/domenic/chai-as-promised/issues/68
        intervalRef = setInterval(function() {
          $rootScope.$apply();
        }, 1);
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

  describe('$transform object', function () {
    it('should be defined', function (done) {
      expect($wakanda).to.have.property('$transform');
      expect($wakanda.$transform).to.be.an('object');
      done();
    });

    it('should have $objectToEntity method', function (done) {
      expect($wakanda.$transform).to.have.property('$objectToEntity');
      expect($wakanda.$transform.$objectToEntity).to.be.a('function');
      done();
    });

    it('should have $objectToCollection method', function (done) {
      expect($wakanda.$transform).to.have.property('$objectToCollection');
      expect($wakanda.$transform.$objectToCollection).to.be.a('function');
      done();
    });
  });

  describe('$objectToEntity function', function () {
    it('should return a NgEntity if provided an Entity', function (done) {
      ds.Employee.oneEmployee().$promise.then(function (event) {
        var entity = event.result;
        var ngEntity = $wakanda.$transform.$objectToEntity(entity);

        expect(ngEntity.$fetch).to.be.a('function');
        expect(ngEntity.$key).to.be.a('function');
        expect(ngEntity.$remove).to.be.a('function');
        expect(ngEntity.$save).to.be.a('function');
        expect(ngEntity.$stamp).to.be.a('function');
        expect(ngEntity.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should throw an error if given an invalid object', function (done) {
      try {
        $wakanda.$transform.$objectToEntity(null);
      }
      catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }

      try {
        $wakanda.$transform.$objectToEntity([]);
      }
      catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }

      try {
        $wakanda.$transform.$objectToEntity({});
      }
      catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
      done();
    });
  });

  describe('$objectToCollection', function() {

    it('should return a NgCollection if given a Collection', function(done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var collection = event.result;
        var ngCollection = $wakanda.$transform.$objectToCollection(collection);

        expect(ngCollection.$totalCount).to.be.equal(ngCollection.$_collection._count);

        var ngEntity = ngCollection[0];
        expect(ngEntity.$fetch).to.be.a('function');
        expect(ngEntity.$key).to.be.a('function');
        expect(ngEntity.$remove).to.be.a('function');
        expect(ngEntity.$save).to.be.a('function');
        expect(ngEntity.$stamp).to.be.a('function');
        expect(ngEntity.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should have a reference on collection in $_collection', function(done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var collection = event.result;
        var ngCollection = $wakanda.$transform.$objectToCollection(collection);

        expect(ngCollection.$_collection).to.be.an('object');
        done();
      });
    });

    it('should have framework methods', function(done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var collection = event.result;
        var ngCollection = $wakanda.$transform.$objectToCollection(collection);

        expect(ngCollection.$fetch).to.be.a('function');
        expect(ngCollection.$more).to.be.a('function');
        expect(ngCollection.$nextPage).to.be.a('function');
        expect(ngCollection.$prevPage).to.be.a('function');
        expect(ngCollection.$totalCount).to.be.a('number');
        expect(ngCollection.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should have user defined methods', function (done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var collection = event.result;
        var ngCollection = $wakanda.$transform.$objectToCollection(collection);

        expect(ngCollection.myCollectionMethod).to.be.a('function');
        done();
      });
    });
  });
});
