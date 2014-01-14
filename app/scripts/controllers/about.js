'use strict';

angular.module('angularWakandaFrontApp')
        .controller('AboutCtrl', ['$http','$scope',function($http,$scope) {
            $scope.xhrToWakanda = function(){
//                var xhr = new XMLHttpRequest();
//                xhr.open("GET", "http://127.0.0.1:8081", true);
//                xhr.onreadystatechange = function(url) {
//                    console.log(xhr.responseText);
//                };
//                xhr.send();
                $http({
                    method : 'GET',
                    url : $scope.url
                }).success(function(data){
                    console.log(data);
                }).error(function(error){
                    console.log(error);
                });
            };
        }]);
