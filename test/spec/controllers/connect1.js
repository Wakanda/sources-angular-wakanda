'use strict';

describe('Controller: Connect1Ctrl', function() {

    // load the controller's module
    beforeEach(module('angularWakandaFrontApp'));

    var Connect1Ctrl,
            scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        Connect1Ctrl = $controller('Connect1Ctrl', {
            $scope: scope
        });
    }));

    it('should be true', function() {
        expect(true).toBe(true);
    });
});
