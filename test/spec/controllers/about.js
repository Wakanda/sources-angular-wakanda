'use strict';

describe('Controller: AboutCtrl', function() {

    // load the controller's module
    beforeEach(function(){
      module('angularWakandaFrontApp');
      module('unitTestsHelpersModule');
    });

    var AboutCtrl,
            scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        AboutCtrl = $controller('AboutCtrl', {
            $scope: scope
        });
    }));

    it('should attach url1 and url2 to the scope', function() {
        expect(typeof scope.url1).toBe('string');
        expect(typeof scope.url2).toBe('string');
    });
});