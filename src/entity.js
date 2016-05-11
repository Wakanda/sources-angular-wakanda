var wakanda = angular.module('wakanda');

wakanda.factory('entityFactory', ['$injector', '$q', 'dsStorage', 'mediaFactory', 'rootScopeSafeApply', 'wakandaClient',
  function ($injector, $q, dsStorage, mediaFactory, rootScopeSafeApply, wakandaClient) {
    var entityFactory = {};

    //Entity class for Angular-Wakanda connector
    function NgEntity(ngDataClass) {
      //Wakanda-Client entity container
      Object.defineProperty(this, '$_entity', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: null
      });

      //Container to store related entities and collections
      Object.defineProperty(this, '$_relatedAttributes', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: {}
      });

      //Creating property accessors for the entity
      ngDataClass.$_dataClass.attributes.forEach(function (attr) {
        if (attr.kind === 'relatedEntity') {
          defineEntityProperty(this, attr);
        }
        else if (attr.kind === 'relatedEntities') {
          defineCollectionProperty(this, attr);
        }
        else if (attr.kind === 'storage' && (attr.type === 'image' || attr.type === 'blob')) {
          defineMediaProperty(this, attr);
        }
        else {
          defineScalarProperty(this, attr);
        }
      }.bind(this));

      addUserDefinedMethods(this, ngDataClass);
    };

    NgEntity.prototype.$save        = save;
    NgEntity.prototype.$remove      = remove;
    NgEntity.prototype.$fetch       = fetch;
    NgEntity.prototype.$toJSON      = toJSON;
    NgEntity.prototype.$key         = key;
    NgEntity.prototype.$stamp       = stamp;
    NgEntity.prototype.$isNew       = isNew;
    NgEntity.prototype.$isDeferred  = isDeferred;
    NgEntity.prototype.$recompute   = recompute;

    function key() {
      if (this.$_entity) {
        return this.$_entity._key;
      }
    }

    function stamp() {
      if (this.$_entity) {
        return this.$_entity._stamp;
      }
    }

    function isNew() {
      return this.$_entity._key === undefined;
    }

    function isDeferred() {
      return this.$_entity._deferred;
    }

    function save() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.save()
        .then(function (entity) {
          rootScopeSafeApply(function () {
            //Related entities or collections might have changed server-side,
            //cleaning entity-level "cache"
            this.$_relatedAttributes = {};

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

    function recompute() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.recompute()
        .then(function () {
          rootScopeSafeApply(function () {
            //Related entities or collections might have changed server-side,
            //cleaning entity-level "cache"
            this.$_relatedAttributes = {};

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

    function remove() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.delete()
        .then(function (res) {
          rootScopeSafeApply(function () {
            this.$_entity = null;

            deferred.resolve({
              result: res
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

    function fetch() {
      if (!this.$_entity._key) {
        throw new Error("$fetch error - no key nor pointer was found");
      }

      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_entity.fetch()
        .then(function () {
          rootScopeSafeApply(function () {
            deferred.resolve({
              result: this.$_entity
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

    function toJSON() {
      return JSON.stringify(this, function (key, value) {
        if (key === '$promise') {
          return undefined;
        }
        return value;
      });
    }

    function addUserDefinedMethods (ngEntity, ngDataClass) {
      ngDataClass.$_dataClass.methods.entity.forEach(function (methodName) {
        ngEntity[methodName] = function () {
          var args = arguments;
          var deferred = $q.defer();
          var promise = deferred.promise;

          ngEntity.$_entity[methodName].apply(ngEntity.$_entity, args)
            .then(function (res) {
              rootScopeSafeApply(function () {
                var result = res;

                if (wakandaClient.helper.isEntity(res)) {
                  var ngDataClass = dsStorage.getNgDataClass(res._dataClass.name);
                  if (ngDataClass) {
                    result = entityFactory.createNgEntity(ngDataClass);
                    result.$_entity = res;
                  }
                }
                else if (wakandaClient.helper.isCollection(res)) {
                  var ngDataClass = dsStorage.getNgDataClass(res._dataClass.name);
                  if (ngDataClass) {
                    var collectionFactory = $injector.get('collectionFactory');
                    result = collectionFactory.createNgCollection(ngDataClass);
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
              });
            });

          promise.$promise = promise;
          return promise;
        };
      });
    }

    function defineEntityProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          if (this.$_entity[attr.name]) {
            if (!ngEntity.$_relatedAttributes[attr.name]) {
              var ngDataClass = dsStorage.getNgDataClass(attr.type);
              var relatedNgEntity = new NgEntity(ngDataClass);

              relatedNgEntity.$_entity = ngEntity.$_entity[attr.name];
              ngEntity.$_relatedAttributes[attr.name] = relatedNgEntity;
            }
            return ngEntity.$_relatedAttributes[attr.name];
          }
          else {
            return null;
          }
        },
        set: function (value) {
          if (!(value instanceof NgEntity) && value !== null) {
            throw new Error('Passed value must be an entity or null');
          }

          rootScopeSafeApply(function () {
            if (value) {
              ngEntity.$_relatedAttributes[attr.name] = value;
              ngEntity.$_entity[attr.name] = value.$_entity;
            }
            else {
              delete ngEntity.$_relatedAttributes[attr.name];
              ngEntity.$_entity[attr.name] = null;
            }
          });
        }
      });
    }

    function defineCollectionProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          if (this.$_entity[attr.name]) {
            if (!ngEntity.$_relatedAttributes[attr.name]) {
              var ngDataClass = dsStorage.getNgDataClass(attr.entityType);
              var collectionFactory = $injector.get('collectionFactory');
              var ngCollection = collectionFactory.createNgCollection(ngDataClass);

              collectionFactory.addEntities(ngCollection, this.$_entity[attr.name].entities);
              ngCollection.$_collection = this.$_entity[attr.name];
              ngEntity.$_relatedAttributes[attr.name] = ngCollection;
            }
            return ngEntity.$_relatedAttributes[attr.name];
          }
          else {
            return null;
          }
        },
        set: function () {
          throw new Error("Can't set relatedEntities attribute " + attr.name + ".");
        }
      });
    }

    function defineMediaProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          if (!this.$_relatedAttributes[attr.name]) {
            var ngMedia = mediaFactory.createNgMedia(this.$_entity[attr.name]);
            this.$_relatedAttributes[attr.name] = ngMedia;
          }
          return this.$_relatedAttributes[attr.name];
        },
        set: function () {
          throw new Error("Can't set media attribute " + attr.name + ".");
        }
      });
    }

    function defineScalarProperty(ngEntity, attr) {
      Object.defineProperty(ngEntity, attr.name, {
        enumerable: true,
        get: function () {
          if (!this.$_entity) {
            return null;
          }

          return ngEntity.$_entity[attr.name] || null;
        },
        set: function (value) {
          rootScopeSafeApply(function () {
            ngEntity.$_entity[attr.name] = value;
          });
        }
      });
    }

    entityFactory.isNgEntity = function (object) {
      return object instanceof NgEntity === true;
    };

    entityFactory.createNgEntity = function (ngDataClass) {
      return new NgEntity(ngDataClass);
    };

    return entityFactory;
  }]);
