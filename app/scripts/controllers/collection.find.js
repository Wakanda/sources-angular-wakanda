'use strict';

/**
 * @ngdoc function
 * @name angularWakandaFrontApp.controller:CollectionFindCtrl
 * @description
 * # CollectionFindCtrl
 * Controller of the angularWakandaFrontApp
 */
angular.module('angularWakandaFrontApp')
  .controller('CollectionFindCtrl', function ($scope, $wakanda) {
    $scope.employees1 = $wakanda.$ds.Employee.$find({
      pageSize : 10
    });
    $scope.employees2 = $wakanda.$ds.Employee.$find({
      pageSize : 10
    });
  });
