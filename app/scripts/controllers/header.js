'use strict';

angular.module('angularWakandaFrontApp')
        .controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.links = [
              {href: '/', text: 'Home'},
              {href: '/about', text: 'About'},
              {href: '/connect1', text: 'Connect1'},
              {href: '/retrieve-infos', text: 'Retrieve infos'},
              {href: '/example1', text: 'Example1'},
              {href: '/example2', text: 'Example2'},
              {href: '/example3', text: 'Example3'},
              {href: '/test1', text: 'Test1'}
            ];
            $scope.isActive = function(viewLocation) {
              var active = (viewLocation === $location.path());
              return active;
            };
          }]);