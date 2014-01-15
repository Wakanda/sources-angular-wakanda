'use strict';

angular.module('angularWakandaFrontApp')
        .controller('HeaderCtrl', ['$scope','$location',function($scope, $location) {
            $scope.links = [
                {href : '/', text : 'Home'},
                {href : '/about', text : 'About'},
                {href : '/connect1', text : 'Connect1'}
            ];
            $scope.isActive = function (viewLocation) {
                var active = (viewLocation === $location.path());
                return active;
           };
        }]);