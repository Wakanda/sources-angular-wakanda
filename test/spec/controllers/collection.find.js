'use strict';

describe('Controller: CollectionFindCtrl', function () {

  // load the controller's module
  beforeEach(module('angularWakandaFrontApp'));

  var CollectionFindCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollectionFindCtrl = $controller('CollectionFindCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
