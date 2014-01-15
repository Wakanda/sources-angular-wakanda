'use strict';

describe('Controller: RetrieveInfosCtrl', function() {

    // load the controller's module
    beforeEach(module('angularWakandaFrontApp'));

    var RetrieveinfosCtrl,
            scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        RetrieveinfosCtrl = $controller('RetrieveInfosCtrl', {
            $scope: scope
        });
    }));

    it('should be true', function() {
        expect(true).toBe(true);
    });
});
