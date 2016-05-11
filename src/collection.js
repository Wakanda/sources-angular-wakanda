var wakanda = angular.module('wakanda');

wakanda.factory('collectionFactory', ['$injector', '$q', 'dsStorage', 'rootScopeSafeApply', 'wakandaClient',
  function ($injector, $q, dsStorage, rootScopeSafeApply, wakandaClient) {
    var collectionFactory = {};

    function _decorate(ngCollection, ngDataClass) {
      //WakandaClient collection container
      Object.defineProperty(ngCollection, '$_collection', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: null
      });

      Object.defineProperty(ngCollection, '$_dataClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: ngDataClass
      });

      Object.defineProperty(ngCollection, '$totalCount', {
        enumerable: true,
        configurable: false,
        get: function () {
          return ngCollection.$_collection._count;
        }
      });

      Object.defineProperty(ngCollection, '$queryParams', {
        enumerable: true,
        configurable: false,
        get: function () {
          return {
            pageSize: ngCollection.$_collection._pageSize,
            start: ngCollection.$_collection._first
          };
        }
      });

      ngCollection.$fetch     = fetch;
      ngCollection.$nextPage  = nextPage;
      ngCollection.$prevPage  = prevPage;
      ngCollection.$toJSON    = toJSON;
      ngCollection.$more      = more;

      addUserDefinedMethods(ngCollection, ngDataClass);
    }

    function fetch(options) {

      var opt = options || {};

      if (opt.orderBy) {
        throw new Error("orderBy can't be change on a $fetch (query collection's cached on server side)");
      }

      if (opt.select) {
        throw new Error("select can't be change on a $fetch (query collection's cached on server side)");
      }

      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.fetch(options)
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function more() {

      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.more()
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this));
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function nextPage() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.nextPage()
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this))
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      promise.$promise = promise;
      return promise;
    }

    function prevPage() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_collection.prevPage()
        .then(function (res) {
          rootScopeSafeApply(function () {
            emptyNgCollection(this);
            addEntities(this, this.$_collection.entities);

            deferred.resolve({
              result: this
            });
          }.bind(this))
        }.bind(this))
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          })
        })

      promise.$promise = promise;
      return promise;
    }

    function toJSON() {
      //Two things: it eliminates internal properties, and it output as real
      //array, as JS doesn't see NgCollection as an array
      var array = [];
      for (var i = 0; i < this.length; i++) {
        array.push(this[i]);
      }

      return JSON.stringify(array);
    }

    function addUserDefinedMethods(ngCollection, ngDataClass) {
      ngDataClass.$_dataClass.methods.collection.forEach(function (methodName) {
        ngCollection[methodName] = function () {
          var args = arguments;
          var deferred = $q.defer();
          var promise = deferred.promise;

          ngCollection.$_collection[methodName].apply(ngCollection.$_collection, args)
            .then(function (res) {
              rootScopeSafeApply(function () {
                var result = res;

                if (wakandaClient.helper.isEntity(res)) {
                  var ngDataClass = dsStorage.getNgDataClass(res._dataClass.name);
                  if (ngDataClass) {
                    var entityFactory = $injector.get('entityFactory');
                    result = entityFactory.createNgEntity(ngDataClass);
                    result.$_entity = res;
                  }
                }
                else if (wakandaClient.helper.isCollection(res)) {
                  var ngDataClass = dsStorage.getNgDataClass(res._dataClass.name);
                  if (ngDataClass) {
                    result = collectionFactory.createNgCollection(ngDataClass)
                    result.$_collection = res;
                    collectionFactory.addEntities(result, res.entities);
                  }
                }

                deferred.resolve({
                  result: result
                });
              });
            })
            .catch(function (e) {
              rootScopeSafeApply(function () {
                deferred.reject(e);
              })
            });

          promise.$promise = promise;
          return promise;
        };
      });
    }

    function emptyNgCollection(ngCollection) {
      for (var i = 0; i < ngCollection.length; i++) {
        delete ngCollection[i];
      }
      ngCollection.length = 0;
    };

    function addEntities(ngCollection, entities) {
      //Dynamic injection to avoid circular dependency crisis thrown by Angular
      var entityFactory = $injector.get('entityFactory');

      for (var i = 0; i < entities.length; i++) {
        var ngEntity = entityFactory.createNgEntity(ngCollection.$_dataClass);
        ngEntity.$_entity = entities[i];

        ngCollection.push(ngEntity);
      }
    };

    collectionFactory.isNgCollection = function (object) {
      //Direct return returns undefined... Strange.
      var r =
        typeof object === 'object' &&
        typeof object.$fetch === 'function' &&
        typeof object.$more === 'function' &&
        typeof object.$prevPage === 'function' &&
        typeof object.$nextPage === 'function' &&
        typeof object.$toJSON === 'function';

      return r;
    };

    collectionFactory.emptyNgCollection = emptyNgCollection;
    collectionFactory.addEntities       = addEntities;

    collectionFactory.createNgCollection = function (ngDataClass) {
      var ngCollection = [];
      _decorate(ngCollection, ngDataClass);

      return ngCollection;
    };

    return collectionFactory;
  }]);
