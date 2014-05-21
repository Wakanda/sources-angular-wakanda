'use strict';

angular.module('angularWakandaFrontApp')
        .controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.links = [
              {href: '/', text: 'Home'},
              {href: '/about', text: 'About'},
              {href: '/retrieve-infos', text: 'Retrieve infos'},
              {href: '/example1', text: 'Example1'},
              {href: '/example2', text: 'Example2'},
              {href: '/example3', text: 'Example3'},
              {href: '/test1', text: 'Test1'},
              {href: '/test2', text: 'Test2'},
              {href: '/test3', text: 'Test3'},
              {href: '/bug-test1', text: 'Bug Test1'},
              {href: '/bug-test2', text: 'Bug Test2'},
              {href: '/basics1', text: 'Basics1'},
              {href: '/basics2', text: 'Basics2'}
            ];
            $scope.isActive = function(viewLocation) {
              var active = (viewLocation === $location.path());
              return active;
            };
          }]);