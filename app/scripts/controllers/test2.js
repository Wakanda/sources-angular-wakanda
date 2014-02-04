'use strict';

var ds, products;

angular.module('angularWakandaFrontApp')
  .controller('Test2Ctrl', ['$scope','wakConnectorService',function ($scope, wakConnectorService) {
    
    //retrieve infos from db
    ds = wakConnectorService.getDatastore();
    ds.Product.$find({}).then(function(event){
        console.log(event);
        products = $scope.products = event.result;
    });
    
    //expose scoped methods
    $scope.toggleEditMode = function(product){
      product.editMode = !product.editMode;
    };
    $scope.editOnEnter = function(keyCode,product){
      console.log(keyCode);
      if(keyCode === 13 && product.name){
        product.$save().then(function(e){
          console.log(e);
        });
        $scope.toggleEditMode(product);
      }
    };
    
    $scope.displayEntityMethodResult = function(product){
      product.myEntityMethod("hello","world","from "+product.name).then(function(e){
        window.alert(e.result);
      });
    };
    
  }]);
