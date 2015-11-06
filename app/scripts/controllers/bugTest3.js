'use strict';

var ds, _;

angular.module('angularWakandaFrontApp')
        .controller('BugTest3Ctrl', ['$scope', '$route', '$wakanda', '$q', function ($scope, $route, $wakanda, $q) {

            ds = $wakanda.$ds;

            var myNewEmployeeCollection = [], myNewEmployeeTmp, myNewCompany, i;

            $scope.display = function () {
              var a = $scope.employees = $wakanda.$ds.Employee.$query({
                filter: 'firstName = _*',
                select:'employer'
              });
              var b = $scope.companies = $wakanda.$ds.Company.$query({
                filter: 'name = _*',
                select: 'staff'//jump to employees collection
              });
            };

            //just One then
            myNewCompany = $wakanda.$ds.Company.$create({name: '_comp' + (new Date()).getTime()});

            for (i = 0; i < 10; i++) {
              myNewEmployeeTmp = $wakanda.$ds.Employee.$create({firstName: '_foo' + i, lastName: '_bar' + i});

              //There goes the bind sorry it was in doing some stuff I think that's the cause
              myNewEmployeeTmp.employer = myNewCompany;
              myNewEmployeeTmp.$_entity.employer.setValue(myNewEmployeeTmp.employer.$_entity);

              myNewEmployeeCollection.push(myNewEmployeeTmp);
            }

            function saveCollection(collection) {
              return _.map(collection, function (entity) {
                //no need for this fix at all
//                if (entity.$_entity.isNew()) {
//                  delete entity.ID;
//                }

                return entity.$save();
              });
            }

            $scope.launchSaveCollection = function () {

              myNewCompany.$save().then(function () {
                $q.all(saveCollection(myNewEmployeeCollection))
                  .then(function () {
                          console.log('Confirm the save collection of employees promise is resolved');
                        });
              });
            };

            $scope.display();

          }]);
