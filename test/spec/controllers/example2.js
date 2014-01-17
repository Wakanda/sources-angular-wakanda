'use strict';

describe('Controller: Example2Ctrl', function () {

  // load the controller's module
  beforeEach(module('angularWakandaFrontApp'));

  var Example2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Example2Ctrl = $controller('Example2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
