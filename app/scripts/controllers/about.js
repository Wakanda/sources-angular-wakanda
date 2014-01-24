'use strict';

angular.module('angularWakandaFrontApp')
        .controller('AboutCtrl', ['$http', '$scope', function($http, $scope) {
            $scope.url1 = "http://127.0.0.1:8081/rest/$catalog/Products/";
            $scope.url2 = "http://127.0.0.1:9000/rest/$catalog/Products/";
            $scope.xhrToWakanda = function(url) {
              console.log(url);
//                var xhr = new XMLHttpRequest();
//                xhr.open("GET", "http://127.0.0.1:8081", true);
//                xhr.onreadystatechange = function(url) {
//                    console.log(xhr.responseText);
//                };
//                xhr.send();
              $http({
                method: 'GET',
                url: url
              }).success(function(data) {
                $scope.error = false;
                $scope.result = JSON.stringify(data, null, "\t");
                console.log(data);
              }).error(function(error) {
                $scope.error = true;
                $scope.result = "An error occured it must be a 'Access-Control-Allow-Origin' one, please watch the console.";
              });
            };
          }]);
