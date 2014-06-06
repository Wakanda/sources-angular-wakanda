'use strict';

describe('Directive: dbState', function () {

  // load the directive's module
  beforeEach(module('angularWakandaFrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<db-state></db-state>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dbState directive');
  }));
});
