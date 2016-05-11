angular.module('wakanda')
  .factory('$wakandaManager', ['$wakanda', '$q', function ($wakanda, $q) {

      var factory = {};

      factory.getDataStore = function (catalog) {
        return $wakanda.init(catalog);
      };

      factory.user = {};

      factory.currentUser = function () {
        return $wakanda.$currentUser().$promise
          .then(function (e) {
            if (e && e.result) {
              return e.result;
            }
            else {
              return $q.reject();
            }
          });
      };

      factory.currentUserBelongsTo = function (groupName) {
        return $wakanda.$currentUserBelongsTo(groupName)
          .then(function (e) {
            if (e && e.result === true) {
              return true;
            }
            else {
              return $q.reject();
            }
          });
      };

      return factory;
  }]);
