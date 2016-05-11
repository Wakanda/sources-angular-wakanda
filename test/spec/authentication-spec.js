describe('Connector/Authentication:', function() {
  var $wakanda, $rootScope, $q, unitTestsHelpers,
    intervalRef;

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
          intervalRef = setInterval(function(){ $rootScope.$apply(); }, 1);
      });
    }
  });

  describe('$loginByPassword() function', function() {
    it('should be defined and return a promise', function() {
      expect($wakanda.$loginByPassword).to.be.defined;
      expect($wakanda.$loginByPassword().then).to.be.an.instanceof(Function);
    });
    it('should return a promise on $promise property', function (done) {
      var request = $wakanda.$loginByPassword();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
    it('promise should return true if credentials are valid', function (done) {
      $wakanda.init().then(function(){
        $wakanda.$loginByPassword('bar','bar').should.be.fulfilled.then(function (loginResult) {
          expect(loginResult.result).to.be.true;
          $wakanda.$logout().should.be.fulfilled.should.notify(done);
        });
      });
    });
    it('promise should return false if credentials are unvalid', function (done) {
      $wakanda.$loginByPassword('bar','foo').should.be.fulfilled.then(function (loginResult) {
        expect(loginResult.result).to.be.false;
      }).should.notify(done);
    });
  });

  describe('$login() function', function() {
    it('should be an alias of $loginByPassword', function() {
      expect($wakanda.$login).to.be.defined;
      expect($wakanda.$login).to.be.deep.equal($wakanda.$loginByPassword);
    });
    it('should return a promise on $promise property', function (done) {
      var request = $wakanda.$login();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
  });

  describe('$logout() function', function() {
    it('should be defined and return a promise', function() {
      expect($wakanda.$logout).to.be.defined;
      expect($wakanda.$logout().then).to.be.an.instanceof(Function);
    });
    it('should return a promise on $promise property', function (done) {
      var request = $wakanda.$logout();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
    it('promise should return true if user is logged out', function (done) {
      $wakanda.init().then(function(){
        $wakanda.$loginByPassword('bar','bar').should.be.fulfilled.then(function(loginResult){
          $wakanda.$logout().should.be.fulfilled.then(function (logoutResult) {
            expect(logoutResult.result).to.be.true;
          }).should.notify(done);
        });
      });
    });
  });

  describe('$currentUser() function', function() {
    it('should be defined and return a promise', function() {
      expect($wakanda.$currentUser).to.be.defined;
      expect($wakanda.$currentUser().then).to.be.an.instanceof(Function);
    });
    it('should return a promise on $promise property', function (done) {
      var request = $wakanda.$currentUser();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });
    it('promise should return null if no user is logged', function (done) {
      $wakanda.init().then(function(){
        $wakanda.$currentUser().should.be.fulfilled.then(function (user) {
          expect(user.result).to.be.null;
        }).should.notify(done);
      });
    });
    it('promise should return user-info if user is logged', function (done) {
      $wakanda.init().then(function(){
        $wakanda.$loginByPassword('bar','bar').should.be.fulfilled.then(function(loginResult){
          $wakanda.$currentUser().should.be.fulfilled.then(function (user) {
            expect(user.result).to.be.an('object');
            expect(user.result.userName).to.be.a('string');
            expect(user.result.fullName).to.be.a('string');
            expect(user.result.ID).to.be.a('string');
            $wakanda.$logout().should.be.fulfilled.should.notify(done);
          });
        });
      });
    });
  });

  describe('$currentUserBelongsTo() function', function() {
    it('should be defined and return a promise', function() {
      expect($wakanda.$currentUserBelongsTo).to.be.defined;
      expect($wakanda.$currentUserBelongsTo().then).to.be.an.instanceof(Function);
    });
    it('should return a promise on $promise property', function (done) {
      var request = $wakanda.$currentUserBelongsTo();
      var promise = request.$promise;

      expect(request).to.have.property('$promise');
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');

      done();
    });

    it('promise should return false if user doesnt belongs to specified group', function (done) {
      $wakanda.$loginByPassword('LUHEJI','HARRY').should.be.fulfilled.then(function(loginResult){
        $wakanda.$currentUserBelongsTo('Admin').should.be.fulfilled.then(function (groupResult) {
          expect(groupResult.result).to.be.false;
          $wakanda.$logout().should.be.fulfilled.should.notify(done);
        });
      });
    });
  });

  afterEach(function() {
    $wakanda = $rootScope = null;
    clearInterval(intervalRef);
  });

});
