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
    element = angular.element('<div db-state></db-state>');
    element = $compile(element)(scope);
//    expect(element.find('h3').text()).to.be.equal('E2E Tests - First draft');
  }));
});
