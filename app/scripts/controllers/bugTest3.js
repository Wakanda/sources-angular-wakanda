'use strict';

var ds,_;

angular.module('angularWakandaFrontApp')
        .controller('BugTest3Ctrl', ['$scope','$route','$wakanda','$q',function($scope,$route,$wakanda,$q) {
            
            var employeesToSave = [], companiesToSave = [], i;
            
            $scope.display = function(){
              $scope.employees = $wakanda.$ds.Employee.$find({
                filter:'firstName = _*'
              });
              $scope.companies = $wakanda.$ds.Company.$find({
                filter:'name = _*'
              });
            };
            
            for(i=0; i<10; i++){
              employeesToSave.push($wakanda.$ds.Employee.$create({
                firstName:'_foo'+i,lastName:'_bar'+i
              }));
            }
            for(i=0; i<10; i++){
              companiesToSave.push($wakanda.$ds.Company.$create({
                name:'_comp'+i
              }));
            }
            
            function saveCollection(collection) {
              return _.map(collection,function(entity) {
                //no need for this fix at all
//                if (entity.$_entity.isNew()) {
//                  delete entity.ID;
//                }

                return entity.$save();
              });
            }
            
            $scope.launchSaveCollection = function() {
              return $q.all(saveCollection(employeesToSave)).then(function() {
                return $q.all(saveCollection(companiesToSave)).then(function(){
                  $scope.display();
                });
              });
            };
            
            $scope.display();
            
        }]);
