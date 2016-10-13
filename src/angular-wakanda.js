var wakanda = angular.module('wakanda', []);

wakanda.constant('wakandaClient', new WakandaClient.WakandaClient());

wakanda.factory('$wakanda', ['datastoreFactory', 'directoryFactory', 'transformFactory',
  function(datastoreFactory, directoryFactory, transformFactory) {

    var wakandaFactory = {};

    //Init and dataStore
    wakandaFactory.init         = datastoreFactory.init;
    wakandaFactory.getDatastore = datastoreFactory.getDataStore;
    Object.defineProperty(wakandaFactory, '$ds', {
      get: wakandaFactory.getDatastore,
      enumerable: true
    });

    //Directory
    wakandaFactory.$login                 = directoryFactory.login;
    wakandaFactory.$loginByPassword       = directoryFactory.login;
    wakandaFactory.$logout                = directoryFactory.logout;
    wakandaFactory.$currentUser           = directoryFactory.currentUser;
    wakandaFactory.$currentUserBelongsTo  = directoryFactory.currentUserBelongsTo;

    //Transform
    wakandaFactory.$transform = {
      $objectToEntity:      transformFactory.toEntity,
      $objectToCollection:  transformFactory.toCollection
    };

    return wakandaFactory;
  }
]);

wakanda.provider('$wakandaConfig', ['wakandaClient', function(wakandaClient) {
  var hostname = '',
    catalogName;
  this.$get = function() {
    return {
      getHostname: function() {
        return hostname;
      },
      getCatalogName: function() {
        return catalogName;
      }
    };
  };
  this.setHostname = function(_hostname) {
    wakandaClient._httpClient.prefix = _hostname + '/rest';
    hostname = _hostname;
  };
  this.setCatalogName = function(_catalogName) {
    wakandaClient.catalog = _catalogName; 
    catalogName = _catalogName;
  };
}]);
