var wakanda = angular.module('wakanda');

wakanda.provider('dsStorage', function () {
  var ds;

  this.$get = function () {
    return {
      setDataStore: function (_ds) {
        ds = _ds;
      },
      getNgDataClass: function (dcName) {
        return ds ? ds[dcName] : null;
      }
    };
  };
});

wakanda.factory('datastoreFactory', ['$q', 'dataclassFactory', 'dsStorage', 'wakandaClient',
  function ($q, dataclassFactory, dsStorage, wakandaClient) {
    var dsFactory = {};
    var ds;

    dsFactory.init = function(catalogStr) {
      var catalog;
      var promise;

      if (!ds) {
        if (typeof catalogStr !== "string" || catalogStr === '*' || catalogStr === '') {
          catalog = undefined;
        } else {
          catalog = catalogStr.split(',');
        }

        promise = wakandaClient.getCatalog(catalog).then(function(_ds) {
          var dataClasses = {};

          for (var dcName in _ds) {
            if (_ds.hasOwnProperty(dcName)) {
              dataClasses[dcName] = dataclassFactory.createNgDataClass(_ds[dcName]);
            }
          }

          ds = dataClasses;
          dsStorage.setDataStore(dataClasses);
          return dataClasses;
        });
      }
      else {
        deferred = $q.defer();
        deferred.resolve(ds);
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

  return dsFactory;
}]);
