'use strict';

angular.module('angularWakandaFrontApp')
        .controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.links = {
              'working' : [
                {href: '/', text: 'Home'},
                {href: '/about', text: 'About'},
                {href: '/retrieve-infos', text: 'Retrieve infos'},
                {href: '/example1', text: 'Example1'},
                {href: '/example2', text: 'Example2'},
                {href: '/example3', text: 'Example3'},
                {href: '/test1', text: 'Test1'},
                {href: '/test2', text: 'Test2'},
                {href: '/test3', text: 'Test3'},
                {href: '/test4', text: 'Test4'},
                {href: '/test5', text: 'Test5'},
                {href: '/test6', text: 'Test6'},
                {href: '/test7', text: 'Test7'},
                {href: '/test8', text: 'Test8'},
                {href: '/bug-test1', text: 'Bug Test1'},
                {href: '/bug-test2', text: 'Bug Test2'},
                {href: '/bug-test3', text: 'Bug Test3'},
                {href: '/basics1', text: 'Basics1'},
                {href: '/basics2', text: 'Basics2'},
                {href: '/collection.find', text: 'Collection $find'}
              ],
              'e2e-tests' : [
                {href: '/e2e-tests/main', text: 'Main'},
                {href: '/e2e-tests/db-state', text: 'DbState (directive alone)'},
                {href: '/e2e-tests/directory-state', text: 'DirectoryState (directive alone)'},
                {href: '/e2e-tests/first-draft', text: 'First draft'},
                {href: '/e2e-tests/directory', text: 'Directory'},
                {href: '/e2e-tests/directory-stand-alone', text: 'Directory (stand alone)'}
              ],
              'brut' : [
                {href: '/brut/vanilla-ds', text: 'vanillaDs'},
                {href: '/brut/vanilla-ds2', text: 'vanillaDs2'}
              ]
            };
            $scope.isActive = function(viewLocation) {
              var active = (viewLocation === $location.path());
              return active;
            };
            $scope.toggleLinksDisplay = function(linkType){
              if($scope.links[linkType]){
                $scope.links[linkType].show = !$scope.links[linkType].show;
              }
            };
            $scope.links.working.show = true;
          }]);
