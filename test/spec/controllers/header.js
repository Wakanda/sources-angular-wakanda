'use strict';

describe('Controller: HeaderCtrl', function() {

    // load the controller's module
    beforeEach(module('angularWakandaFrontApp'));

    var HeaderCtrl,
            scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        HeaderCtrl = $controller('HeaderCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of links to the scope', function() {
        expect(scope.links.length).toBeGreaterThan(0);
    });
});
