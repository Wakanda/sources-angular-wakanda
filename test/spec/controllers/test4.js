'use strict';

describe('Controller: Test4Ctrl', function () {

  // load the controller's module
  beforeEach(module('angularWakandaFrontApp'));

  var Test4Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Test4Ctrl = $controller('Test4Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).to.be.equal(3);
  });
});
