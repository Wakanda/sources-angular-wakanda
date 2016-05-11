var wakanda = angular.module('wakanda');

wakanda.factory('directoryFactory', ['$q', 'rootScopeSafeApply', 'wakandaClient',
  function ($q, rootScopeSafeApply, wakandaClient) {
  var directoryFactory = {};

  directoryFactory.login = function (login, password) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.login(login, password)
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: false
          });
        });
      });

    promise.$promise = promise;
    return promise;
  };

  directoryFactory.logout = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.logout()
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function (e) {
        rootScopeSafeApply(function () {
          deferred.reject(e);
        });
      });

    promise.$promise = promise;
    return promise;
  };

  directoryFactory.currentUser = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.currentUser()
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function () {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: null
          });
        });
      });

    promise.$promise = promise;
    return promise;
  };

  directoryFactory.currentUserBelongsTo = function (groupName) {
    var deferred = $q.defer();
    var promise = deferred.promise;

    wakandaClient.directory.currentUserBelongsTo(groupName || '')
      .then(function (res) {
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      })
      .catch(function (e) {
        rootScopeSafeApply(function () {
          deferred.reject(e);
        });
      });

    promise.$promise = promise;
    return promise;
  };

  return directoryFactory;
}]);
