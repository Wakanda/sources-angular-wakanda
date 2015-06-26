describe('Connector/Initialize:', function() {
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

  describe('init() function', function() {
    it('should be defined and return a promise', function() {
      expect($wakanda.init).to.be.defined;
      expect($wakanda.init).to.be.a('function');
      expect($wakanda.init().then).to.be.a('function');
    });
    it('promise to be fulfilled if ds is found', function(done) {
      var $init = $wakanda.init();
      $init.should.be.fulfilled.then(function (ds) {
        expect($init.$$state.value).to.be.an('object');
        expect($init.$$state.status).to.equal(1);
      }).should.notify(done);
    });
    it('promise to be rejected if ds is not found', function(done) {
      var $badInit = $wakanda.init('abc123cde456');
      $badInit.should.be.rejected.then(function(ds){
        expect($badInit.$$state.value).to.be.an('object');
        expect($badInit.$$state.status).to.equal(2);
        var $correctInit = $wakanda.init('*');
        $correctInit.should.be.fulfilled.then(function (ds) {
          expect($correctInit.$$state.value).to.be.an('object');
          expect($correctInit.$$state.status).to.equal(1);
        }).should.notify(done);
      })
    });
    it('promise should resolve return ds; if ds != null', function(done) {
      var $init = $wakanda.init(), firstDs, secondDs;
      $init.should.be.fulfilled.then(function (ds) {
        firstDs = ds;
        var $otherInit = $wakanda.init();
        $otherInit.should.be.fulfilled.then(function (ds) {
          secondDs = ds;
          expect(firstDs).to.be.deep.equal(secondDs);
        }).should.notify(done);
      })
    });
  });

  describe('getDatastore() function', function() {
    it('should be defined and be a function', function() {
      expect($wakanda.getDatastore).to.be.defined;
      expect($wakanda.getDatastore).to.be.a('function');
    });
    it('should return the Datastore', function(done) {
      $wakanda.init().should.be.fulfilled.then(function (ds) {
        expect($wakanda.getDatastore()).to.be.defined;
        expect($wakanda.getDatastore()).to.be.deep.equal(ds);
      }).should.notify(done);
    });
    it('should throw an error if the ds is not found yet', function(done) {
      var $badInit = $wakanda.init('abc123cde456');
      $badInit.should.be.rejected.then(function(ds){
        try {
            $wakanda.getDatastore();
            Assert.Fail();
        } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
        }
      }).should.notify(done);
    });
    it('should have an alias $ds alias method', function(done) {  
      $wakanda.init().should.be.fulfilled.then(function (ds) {
        expect($wakanda.$ds).to.be.defined;
        expect($wakanda.$ds).to.be.deep.equal(ds);
        expect($wakanda.$ds).to.be.deep.equal($wakanda.getDatastore());
      }).should.notify(done);
    });
    it('should have an alias $ds and throw an error if the Datastore is not defined yet', function(done) {
      $wakanda.init('abc123cde456').should.be.rejected.then(function (ds) {
        try {
            $wakanda.$ds;
            Assert.Fail();
        } catch (Exception) {
            expect(Exception).to.be.an.instanceof(Error);
        }
      }).should.notify(done);
    });
  });

  afterEach(function() {
    $wakanda = $rootScope = null;
    clearInterval(intervalRef);
  });

});