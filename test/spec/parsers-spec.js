describe('Connector/Parsers :', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers, intervalRef, ds;

  beforeEach(function() {
    if (!$wakanda) {
      module('wakanda');
      module('unitTestsHelpersModule');
      inject(function(_$rootScope_, _$wakanda_, _$q_, _unitTestsHelpers_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $wakanda = _$wakanda_;
        unitTestsHelpers = _unitTestsHelpers_;
        unitTestsHelpers.db.reset(false);
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

  describe('$parsers object', function () {
    it('should be defined', function (done) {
      expect($wakanda).to.have.property('$parsers');
      expect($wakanda.$parsers).to.be.an('object');
      done();
    });

    it('should have WAFEntityToNgWakEntity method', function (done) {
      expect($wakanda.$parsers).to.have.property('WAFEntityToNgWakEntity');
      expect($wakanda.$parsers.WAFEntityToNgWakEntity).to.be.a('function');
      done();
    });

    it('should have WAFCollectionToNgWakEntityCollection method', function (done) {
      expect($wakanda.$parsers).to.have.property('WAFCollectionToNgWakEntityCollection');
      expect($wakanda.$parsers.WAFCollectionToNgWakEntityCollection).to.be.a('function');
      done();
    });
  });

  describe('WAFEntityToNgWakEntity function', function () {
    it('should return a ngWakEntity if provided WAF Entity', function (done) {
      ds.Employee.oneEmployee().$promise.then(function (event) {
        var wafEntity = event.result;
        var ngEntity = $wakanda.$parsers.WAFEntityToNgWakEntity(wafEntity);

        expect(ngEntity.$fetch).to.be.a('function');
        expect(ngEntity.$isLoaded).to.be.a('function');
        expect(ngEntity.$isNew).to.be.a('function');
        expect(ngEntity.$key).to.be.a('function');
        expect(ngEntity.$remove).to.be.a('function');
        expect(ngEntity.$save).to.be.a('function');
        expect(ngEntity.$serverRefresh).to.be.a('function');
        expect(ngEntity.$stamp).to.be.a('function');
        expect(ngEntity.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should throw an error if given an invalid object', function (done) {
      try {
        $wakanda.$parsers.WAFEntityToNgWakEntity(null);
      }
      catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }

      try {
        $wakanda.$parsers.WAFEntityToNgWakEntity([]);
      }
      catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }

      try {
        $wakanda.$parsers.WAFEntityToNgWakEntity({});
      }
      catch (e) {
        expect(e).to.be.an.instanceof(Error);
      }
      done();
    });
  });

  describe('WAFCollectionToNgWakEntityCollection', function() {

    it('should return an array of ngWakEntity give an array of WAFEntity', function(done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var wafCollection = event.result;
        var wakEntities = $wakanda.$parsers.WAFCollectionToNgWakEntityCollection(wafCollection);

        expect(wakEntities).to.be.an('array');
        expect(wakEntities.$totalCount).to.be.equal(wafCollection.length);

        var ngEntity = wakEntities[0];
        expect(ngEntity.$fetch).to.be.a('function');
        expect(ngEntity.$isLoaded).to.be.a('function');
        expect(ngEntity.$isNew).to.be.a('function');
        expect(ngEntity.$key).to.be.a('function');
        expect(ngEntity.$remove).to.be.a('function');
        expect(ngEntity.$save).to.be.a('function');
        expect(ngEntity.$serverRefresh).to.be.a('function');
        expect(ngEntity.$stamp).to.be.a('function');
        expect(ngEntity.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should have a reference on WAF collection in $_collection', function(done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var wafCollection = event.result;
        var wakEntities = $wakanda.$parsers.WAFCollectionToNgWakEntityCollection(wafCollection);

        expect(wakEntities.$_collection).to.be.an('object');
        expect(wakEntities.$_collection).to.be.equal(wafCollection);
        done();
      });
    });

    it('should have framework methods', function(done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var wafCollection = event.result;
        var wakEntities = $wakanda.$parsers.WAFCollectionToNgWakEntityCollection(wafCollection);

        expect(wakEntities.$fetch).to.be.a('function');
        expect(wakEntities.$query).to.be.a('function');
        expect(wakEntities.$add).to.be.a('function');
        expect(wakEntities.$more).to.be.a('function');
        expect(wakEntities.$nextPage).to.be.a('function');
        expect(wakEntities.$prevPage).to.be.a('function');
        expect(wakEntities.$totalCount).to.be.a('number');
        expect(wakEntities.$toJSON).to.be.a('function');
        done();
      });
    });

    it('should have user defined methods', function (done) {
      ds.Employee.lotsOfEmployees().$promise.then(function(event) {
        var wafCollection = event.result;
        var wakEntities = $wakanda.$parsers.WAFCollectionToNgWakEntityCollection(wafCollection);

        expect(wakEntities.myCollectionMethod).to.be.a('function');
        done();
      });
    });
  });
});
