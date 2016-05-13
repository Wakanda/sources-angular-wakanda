var wakanda = angular.module('wakanda');

wakanda.factory('datastoreFactory', ['$q', 'dataclassFactory', 'wakandaClient',
  function ($q, dataclassFactory, wakandaClient) {
    var dsFactory = {};
    var ds = null;

    var _dsMap = {};

    dsFactory.init = function(catalogStr) {
      var catalog;
      var promise;


      if (typeof catalogStr !== "string" || catalogStr === '*' || catalogStr === '') {
        catalog = undefined;
      } else {
        catalog = catalogStr.split(',');
      }

      var cachedCatalog = _dsMap[hashCatalogName(catalog)];

      if (!cachedCatalog) {
        promise = wakandaClient.getCatalog(catalog).then(function(_ds) {
          var dataClasses = {};

          for (var dcName in _ds) {
            if (_ds.hasOwnProperty(dcName)) {
              dataClasses[dcName] = dataclassFactory.createNgDataClass(_ds[dcName], dataClasses);
            }
          }

          //Will be deleted at the same time that $wakanda.$ds and $wakanda.getDataStore
          if (!ds) {
            ds = dataClasses;
          }

          _dsMap[hashCatalogName(catalog)] = dataClasses;

          return dataClasses;
        });
      }
      else {
        deferred = $q.defer();
        deferred.resolve(cachedCatalog);
        promise = deferred.promise;
      }
      promise.$promise = promise;

      return promise;
  };

  dsFactory.getDataStore = function() {
    console.warn('$wakanda.getDataStore() and $wakanda.$ds are deprecated. Use $wakanda.init() instead.');
    if (!ds) {
      throw new Error('The Datastore isn\'t initialized please execute $wakanda.init(catalog) before you run your app.');
    }
    return ds;
  }

  function hashCatalogName(catalog) {
    return JSON.stringify(catalog || '*');
  }

  return dsFactory;
}]);
