var wakanda = angular.module('wakanda');

wakanda.factory('dataclassFactory', ['$q', 'entityFactory', 'collectionFactory', 'rootScopeSafeApply', 'wakandaClient',
  function ($q, entityFactory, collectionFactory, rootScopeSafeApply, wakandaClient) {
    var dcFactory = {};

    function NgDataClass(dataClass, catalog) {
      Object.defineProperty(this, '$_dataClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: dataClass
      });

      Object.defineProperty(this, '$_catalog', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: catalog
      });

      this.$name            = dataClass.name;
      this.$collectionName  = dataClass.collectionName;

      addUserDefinedMethods(this);
    }

    NgDataClass.prototype.$find               = find;
    NgDataClass.prototype.$create             = create;
    NgDataClass.prototype.$query              = query;
    NgDataClass.prototype.$all                = all;
    NgDataClass.prototype.$attr               = attributeInfo;
    NgDataClass.prototype.$entityMethods      = getEntityMethods;
    NgDataClass.prototype.$collectionMethods  = getCollectionMethods;
    NgDataClass.prototype.$dataClassMethods   = getDataClassMethods;

    function find(key, options) {
      var ngEntity = entityFactory.createNgEntity(this);
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_dataClass.find(key, options)
        .then(function (entity) {
          rootScopeSafeApply(function () {
            ngEntity.$_entity = entity;
            deferred.resolve({
              result: ngEntity
            });
          });
        })
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      ngEntity.$promise = promise;
      return ngEntity;
    }

    function create(pojo) {
      var relatedToSet = {};

      if (pojo && typeof pojo === 'object') {
        for (var attr in pojo) {
          if (pojo.hasOwnProperty(attr)) {
            if (entityFactory.isNgEntity(pojo[attr])) {
              relatedToSet[attr] = pojo[attr];
              delete pojo[attr];
            }
          }
        }
      }

      var jscEntity = this.$_dataClass.create(pojo);
      var ngEntity  = entityFactory.createNgEntity(this);
      ngEntity.$_entity = jscEntity;

      for (var attr in relatedToSet) {
        if (relatedToSet.hasOwnProperty(attr)) {
          ngEntity[attr] = relatedToSet[attr];
        }
      };

      return ngEntity;
    }

    function query(options) {
      var ngCollection =  collectionFactory.createNgCollection(this);
      var deferred = $q.defer();
      var promise = deferred.promise;

      this.$_dataClass.query(options)
        .then(function (collection) {
          rootScopeSafeApply(function () {
            ngCollection.$_collection = collection;
            collectionFactory.addEntities(ngCollection, collection.entities);
            deferred.resolve({
              result: ngCollection
            });
          });
        })
        .catch(function (e) {
          rootScopeSafeApply(function () {
            deferred.reject(e);
          });
        });

      ngCollection.$promise = promise;
      return ngCollection;
    }

    function all(options) {
      var opt = options || {};

      if (opt.filter || opt.params) {
        console.warn('params and filter parameters on options object are not allowed on calling $all() method. They will be ignored');
      }

      opt.filter = null;
      opt.params = null;

      return this.$query(opt);
    }

    function addUserDefinedMethods (ngDataClass) {
      ngDataClass.$_dataClass.methods.dataClass.forEach(function (methodName) {
        ngDataClass[methodName] = function () {
          var deferred = $q.defer();
          var promise = deferred.promise;
          var args = arguments;

          ngDataClass.$_dataClass[methodName].apply(ngDataClass.$_dataClass, args)
            .then(function (res) {
              rootScopeSafeApply(function () {
                var result = res;

                if (wakandaClient.helper.isEntity(res)) {
                  var targetDataClass = ngDataClass.$_catalog[res._dataClass.name];
                  if (targetDataClass) {
                    result = entityFactory.createNgEntity(targetDataClass);
                    result.$_entity = res;
                  }
                }
                else if (wakandaClient.helper.isCollection(res)) {
                  var targetDataClass = ngDataClass.$_catalog[res._dataClass.name];
                  if (targetDataClass) {
                    result = collectionFactory.createNgCollection(targetDataClass);
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

    function attributeInfo(attrName) {
      var attributes = this.$_dataClass.attributes;

      if (attrName) {
        for (var i = 0; i < attributes.length; i++) {
          if (attributes[i].name === attrName) {
            return attributes[i];
          }
        }
        return null;
      }

      var attributeMap = {};
      for (var i = 0; i < attributes.length; i++) {
        attributeMap[attributes[i].name] = attributes[i];
      }
      return attributeMap;
    }

    function getCollectionMethods() {
      return getMethods(this, 'collection');
    }

    function getEntityMethods() {
      return getMethods(this, 'entity');
    }

    function getDataClassMethods() {
      return getMethods(this, 'dataClass');
    }

    function getMethods(ngDataClass, type) {
      return ngDataClass.$_dataClass.methods[type];
    }

    dcFactory.createNgDataClass = function (dataClass, catalog) {
      return new NgDataClass(dataClass, catalog);
    }

    return dcFactory;
  }]);
