var wakanda = angular.module('wakanda');

//Just here for backward compatibility
wakanda.factory('transformFactory', ['entityFactory', 'collectionFactory',
  function (entityFactory, collectionFactory) {
    var transformFactory = {};

    transformFactory.toEntity = function (object) {
      console.warn('$transform.$objectToEntity is deprecated. This transformation is done automatically.');

      if(!entityFactory.isNgEntity(object)) {
        throw new Error('$transform.$objectToEntity: invalid object');
      }

      return object;
    };

    transformFactory.toCollection = function (object) {
      console.warn('$transform.$objectToCollection is deprecated. This transformation is done automatically.');

      if(!collectionFactory.isNgCollection(object)) {
        throw new Error('$transform.$objectToCollection: invalid object');
      }

      return object;
    };

    return transformFactory;
  }]);
