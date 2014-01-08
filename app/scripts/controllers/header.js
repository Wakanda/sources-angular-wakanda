'use strict';

angular.module('angularWakandaFrontApp')
        .controller('HeaderCtrl', ['$scope','$location',function($scope, $location) {
            $scope.links = [
                {href : '/', text : 'Home'},
                {href : '/about', text : 'About'}
            ];
            $scope.isActive = function (viewLocation) {
                var active = (viewLocation === $location.path());
                return active;
           };
        }]);