var wakanda = angular.module('wakanda', []);

wakanda.factory('$wakanda', ['$q', '$rootScope', '$http', function($q, $rootScope, $http) {

    var ds = null,
        NgWakEntityClasses = {},
        DEFAULT_PAGESIZE_NESTED_COLLECTIONS = 40;

    var $wakandaResult = {};

    /**
     * Init method to execute once on your application (that will retrieve the WAF catalog, a description of your db)
     * Asynchronous method which returns a promise, so easy to put in the route resolver or whatever way you want
     *
     * @param {String} catalog
     * @returns {$q.promise}
     */
    $wakandaResult.init = function(catalog) {
      console.log('>$wakanda init');
      var deferred = $q.defer();
      if (typeof catalog !== "string" || catalog === '*' || catalog === '') {
        catalog = null;
      }
      if (ds === null) {
        new WAF.DataStore({
          onSuccess: function(event) {
            ds = event.dataStore;
            prepare.wafDatastore(ds);
            prepare.wafDataClasses(ds);
            deferred.resolve(ds);
          },
          onError: function(event) {
            ds = null;
            console.error('>$wakanda init > error', event);
            deferred.reject(event);
          },
          catalog: catalog,
          cacheRef: false
        });
      }
      else {
        deferred.resolve(ds);
      }
      return deferred.promise;
    };

    /**
     * After the init part done, you can access to the datastore via this singleton method
     *
     * @returns {event.dataStore}
     */
    $wakandaResult.getDatastore = function() {
      if (ds !== null) {
        return ds;
      }
      else {
        throw new Error("The Datastore isn't initialized please execute .init(catalog) before you run your app.");
      }
    };

    Object.defineProperty($wakandaResult, '$ds', {
      get: $wakandaResult.getDatastore
    });

    /**
     * Returns a promise :
     * - success : in param an object like {result : true} if ok - {result : false} if ko
     * - error : if the request had a problem
     * @param {string} login
     * @param {string} password
     * @returns {deferred.promise}
     */
    $wakandaResult.$loginByPassword = $wakandaResult.$login = function(login, password) {
      return _wrapInPromise(WAF.directory.loginByPassword, login, password);
    };

    /**
     * Returns a promise :
     * - success : in param an object like {result : currentUserInfos} if ok
     * - error : if the request had a problem
     * @returns {deferred.promise}
     */
    $wakandaResult.$currentUser = function() {
      return _wrapInPromise(WAF.directory.currentUser);
    };

    /**
     * Returns a promise :
     * - success : in param an object like {result : true} if ok - {result : false} if ko
     * - error : if the request had a problem
     * @returns {deferred.promise}
     */
    $wakandaResult.$logout = function() {
      return _wrapInPromise(WAF.directory.logout);
    };

    /**
     * Returns a promise :
     * - success : in param an object like {result : true} if ok - {result : false} if ko
     * - error : if the request had a problem
     * @param {String} groupName
     * @returns {deferred.promise}
     */
    $wakandaResult.$currentUserBelongsTo = function(groupName) {
      return _wrapInPromise(WAF.directory.currentUserBelongsTo, groupName);
    };

    /**
     * Private helper - call generic DataProvider methods and wrap them in promise
     * @param {Function} The async DataProvider's method to be called
     * @param Any parameters needed by the method wrapped
     * @returns {deferred.promise}
     */
    function _wrapInPromise() {
      var args = Array.prototype.slice.call(arguments);
      var callback = args.shift();
      var deferred,
          wakOptions = {};
      deferred = $q.defer();

      wakOptions.onSuccess = function(event) {
        deferred.resolve({ result : event.result });
      };
      wakOptions.onError = function(event) {
        deferred.reject(event);
      };
      args.push(wakOptions);
      callback.apply(this, args);
      return deferred.promise;
    }

    /**
     * Safe $rootScope.$apply which check for $apply or $digest phase before
     *
     * @param {Function} fn
     * @returns {undefined}
     */
    var rootScopeSafeApply = function(fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        $rootScope.$apply(fn);
      }
    };


    /** Prepare DataStore, etc ... */

    var prepare = {
      wafDatastore: function(dataStore) {
        //expose NgWak*Abstract prototypes
        dataStore.$Entity = NgWakEntityAbstract.prototype;
      },
      wafDataClasses: function(dataStore) {
        var dataClassName;
        //add some to prototype
        WAF.DataClass.prototype.$find = $$find;
        WAF.DataClass.prototype.$findOne = $$findOne;
        WAF.DataClass.prototype.$create = $$create;

        //looping through too much infos which were added before
        //hint test for $* and _* properties when looping through arguments

        //loop through the dataClasses of the dataStore
        for (dataClassName in dataStore) {
          if (dataStore.hasOwnProperty(dataClassName) && dataClassName !== "_private" && dataClassName[0] !== '$') {
            prepare.wafDataClassAddMetas(dataStore[dataClassName]);
            prepare.wafDataClassAddDataClassMethods(dataStore[dataClassName]);
            prepare.wafDataClassCreateNgWakEntityClasses(dataStore[dataClassName]);
          }
        }
      },
      wafDataClassAddMetas: function(dataClass) {
        var methodInfo,
            dataClassMethods = [],
            collectionMethods = [],
            entityMethods = [],
            attributes,
            attributeName;

        angular.forEach(dataClass.getMethodList(), function(methodInfo) {
          switch(methodInfo.applyTo) {
            case "entity":
              entityMethods.push(methodInfo.name);
              break;
            case "entityCollection":
              collectionMethods.push(methodInfo.name);
              break;
            case "dataClass":
              dataClassMethods.push(methodInfo.name);
              break;
          }
        });

        attributes = dataClass._private.attributesByName;

        dataClass.$attr = function(attrName) {
          if(typeof attrName === "undefined") {
            return attributes;
          }
          else if(attrName && attributes[attrName]) {
            return attributes[attrName];
          }
          else{
            return null;
          }
        };

        dataClass.$dataClassMethods = function() {
          return dataClassMethods;
        };

        dataClass.$collectionMethods = function() {
          return collectionMethods;
        };

        dataClass.$entityMethods = function() {
          return entityMethods;
        };

        dataClass.$name = dataClass.getName();

        dataClass.$collectionName = dataClass.getCollectionName();

        for(attributeName in attributes) {
          if(attributes[attributeName].identifying === true) {
            dataClass.$_identifyingAttr = attributes[attributeName];
          }
        }

        dataClass.$_relatedAttributes = dataClass.getAttributes().filter(function(attr) {
          if(attr.kind === 'relatedEntity' || attr.kind === 'relatedEntities') {
            return attr;
          }
        });

        dataClass.$_processedAttributes = dataClass.getAttributes().filter(function(attr) {
          if(attr.kind === 'calculated' || attr.kind === 'alias') {
            return attr;
          }
        });

      },
      wafDataClassAddDataClassMethods: function(dataClass) {
        prepareHelpers.createUserDefinedDataClassMethods(dataClass);
      },
      wafDataClassCreateNgWakEntityClasses: function(dataClass) {
        var proto;
        proto = prepareHelpers.createUserDefinedEntityMethods(dataClass);
        NgWakEntityClasses[dataClass.getName()] = NgWakEntityAbstract.extend(proto);
        dataClass.$Entity = NgWakEntityClasses[dataClass.getName()].prototype;
      }
    };

    var prepareHelpers = {
      /**
       *
       * @param {WAF.DataClass} dataClass
       * @returns {Object} to use as a prototype
       */
      createUserDefinedEntityMethods: function(dataClass) {
        var methodName, proto = {};

        for(methodName in dataClass._private.entityMethods) {
          if(dataClass._private.entityMethods.hasOwnProperty(methodName)) {
            proto[methodName + 'Sync'] = function() {
              return this.$_entity[methodName].apply(this.$_entity, arguments);
            };
            proto[methodName] = prepareHelpers.wakandaUserDefinedMethodToPromisableMethods(dataClass._private.entityMethods[methodName]);
          }
        }

        return proto;
      },
      createUserDefinedEntityCollectionMethods: function(dataClass) {
        var methodName, proto = {};
        for(methodName in dataClass._private.entityCollectionMethods) {
          if(dataClass._private.entityCollectionMethods.hasOwnProperty(methodName)) {
            proto[methodName + 'Sync'] = function() {
              return this.$_collection[methodName].apply(this.$_collection, arguments);
            };
            proto[methodName] = prepareHelpers.wakandaUserDefinedMethodToPromisableMethods(dataClass._private.entityCollectionMethods[methodName]);
          }
        }
        return proto;
      },
      createUserDefinedDataClassMethods: function(dataClass) {
        angular.forEach(dataClass.$dataClassMethods(), function(methodName) {
          dataClass[methodName] = function() {
            var defer = $q.defer();
            dataClass.callMethod({
              method: methodName,
              onSuccess: function(event) {
                defer.resolve(event);
              },
              onError: function(error) {
                console.error('userDataClassMethods.onError','error', error);
                defer.reject(error);
              },
              arguments: arguments.length > 0 ? Array.prototype.slice.call(arguments, 0) : []
            });
            return defer.promise;
          };
          dataClass[methodName + 'Sync'] = function() {
            return dataClass.callMethod({
              method: methodName,
              sync: true,
              arguments: arguments.length > 0 ? Array.prototype.slice.call(arguments, 0) : []
            });
          };
        });
      },
      wakandaUserDefinedMethodToPromisableMethods: function(method) {

        return function() {
          var thatArguments = [],
              that,
              wakOptions = {},
              mode,
              deferred;
          //check if we are on an entity or a collection. The mode var will also be used as the name of the pointer later
          if(this instanceof NgWakEntityAbstract) {
            if(typeof this.$_entity === 'undefined' || !(this.$_entity instanceof WAF.Entity)) {
              throw new Error('Calling user defined method on unfetched entity, please call $fetch before or retrieve data on $find');
            }
            mode = '$_entity';
          }
          else{
            mode = '$_collection';
          }
          //duplicate arguments (simple assignation is not sure enough, his is to be sure to have a real array)
          if(arguments.length > 0) {
            for(var i = 0; i<arguments.length; i++) {
              thatArguments.push(arguments[i]);
            }
          }
          //prepare the promise
          deferred = $q.defer();
          that = this;
          wakOptions.onSuccess = function(event) {
            rootScopeSafeApply(function() {
              deferred.resolve(event);
            });
          };
          wakOptions.onError = function(error) {
            rootScopeSafeApply(function() {
              console.error('userMethods.onError','error', error);
              deferred.reject(error);
            });
          };
          //add the asynchronous options block
          thatArguments.unshift(wakOptions);
          if(mode === '$_entity') {
            method.apply(this[mode], thatArguments);
          }
          else{
            if(!this.$_collection) {
              throw new Error("Couldn't call user defined method on collection because no pointer on this collection");
            }
            method.apply(this[mode], thatArguments);//@todo maybe not on this[mode] ?...
          }
          return deferred.promise;
        };

      }
    };

    /** event transformation part */

    var transform = {
      wafEntityCollectionToNgWakEntityCollection: function(ngWakEntityCollection, wafEntityCollection, wakOptions) {

        wakOptions = typeof wakOptions === 'undefined' ? {} : wakOptions;
        var mode = (typeof mode === "undefined" || mode === "replace") ? "replace" : mode;
        var currentDataClass = wafEntityCollection.getDataClass();
        var start = typeof wakOptions.start === 'undefined' ? 0 : wakOptions.start;
        var pageSize = typeof wakOptions.pageSize === 'undefined' ? DEFAULT_PAGESIZE_NESTED_COLLECTIONS : wakOptions.pageSize;

        //adding pointer if not present + methods
        if(typeof ngWakEntityCollection.$_collection === 'undefined') {
          ngWakEntityCollection.$_collection = wafEntityCollection;
          //update framework collection methods
          transform.addFrameworkMethodsToRootCollection(ngWakEntityCollection);
          //add user defined methods for only on the root collection
          transform.addUserDefinedMethodsToCollection(ngWakEntityCollection, true);//@todo @warn refactor for any level / sublevel of collection
        }

        // populate collection
        wafEntityCollection.forEachInCache({
          onSuccess: function(item) {
            ngWakEntityCollection.push(createNgWakEntity(item.entity));
          },
          first: start,
          limit: start + pageSize
        });
      },
      addUserDefinedMethodsToCollection: function(result, root) {
        var userDefinedEntityCollectionMethods,
                dataClass = null;
        //if in anyway the private $_collection pointer isn't here, simply return the object
        //@todo optimize conditionals
        if(root === true) {
          if(typeof result.$_collection !== 'undefined') {
            dataClass = result.$_collection.getDataClass();
          }
        }
        else if(root === false) {
          if(typeof result.$_collection !== 'undefined' && result.$_collection.relEntityCollection !== 'undefined') {
            dataClass = result.$_collection.relEntityCollection;
          }
        }
        //if couldn(t retrieve the dataClass (there may not be always a pointer alredy) - return the object untouched
        if(dataClass === null) {
          return result;
        }
        //add user defined methods for only on the root collection
        userDefinedEntityCollectionMethods = prepareHelpers.createUserDefinedEntityCollectionMethods(dataClass);
        for(var methodName in userDefinedEntityCollectionMethods) {
          if(userDefinedEntityCollectionMethods.hasOwnProperty(methodName)) {
            result[methodName] = userDefinedEntityCollectionMethods[methodName];
          }
        }
        return result;
      },
      addFrameworkMethodsToRootCollection: function(result) {
        result.$fetch = $$fetch;
        result.$find = $$find.bind(result.$_collection);
        result.$add = $$add;
        result.$more = $$more;
        result.$nextPage = $$nextPage;
        result.$prevPage = $$prevPage;
        result.$totalCount = result.$_collection.length;
        result.$toJSON = $$toJSON;
      },
      //@todo adapt / wrap some of the method bellow for nested collections (since their management changed)
      addFrameworkMethodsToNestedCollection: function(result) {
        result.$fetch = $fetchRelatedEntities.bind(result);
        result.$find = $$find.bind(result.$_collection);
        result.$more = $$more;
        result.$nextPage = $$nextPage;
        result.$prevPage = $$prevPage;
        result.$toJSON = $$toJSON;
        result.$isLoaded = function() { return !! result.$_isLoaded; };
        result.$totalCount = null;
      },
      cleanNgWakEntityAfterSave: function(ngWakEntity) {
        var processedAttributes = ngWakEntity.$_entity.getDataClass().$_processedAttributes;
        if(processedAttributes.length > 0) {
          processedAttributes.forEach(function(attr) {
            if(typeof ngWakEntity.$_entity[attr.name].$_tempValue !== 'undefined') {
              delete ngWakEntity.$_entity[attr.name].$_tempValue;
            }
          });
        }
      }
    };

    /** public methods */

    /**
     * Applied to WAF.DataClass.prototype
     *
     * @argument {Object} pojo Simple JS object matching the dataclass representation
     * @returns {NgWakEntity}
     */
    var $$create = function(pojo) {
        return createNgWakEntity(new WAF.Entity(this, pojo || {}), { expend: true });
    };

    var $$upload = function(file) {
      console.log('$upload not yet implemented');
    };

    /**
     *
     * @param {Array[NgWakEntity} resultSet (nested collection)
     * @param {Int} pageSize
     * @param {Int} start
     * @returns {undefined}
     */
    var updateCollectionQueryInfos = function(resultSet, pageSize, start) {
      if(typeof resultSet.$query === 'undefined') {
        resultSet.$query = {};
      }
      resultSet.$query.pageSize   = pageSize;
      resultSet.$query.start      = start;
    };

    /**
     *
     * @param {Array[NgWakEntity]} resultSet
     * @param {Int} pageSize
     * @param {Int} start
     * @param {String} filter (won't be updated if null or '') @optional
     * @returns {undefined}
     */
    var updateQueryInfos = function(resultSet, pageSize, start, filter) {
      if(typeof resultSet.$query === 'undefined') {
        resultSet.$query = {};
      }
      resultSet.$query.pageSize   = pageSize;
      resultSet.$query.start      = start;
      resultSet.$query.filter     = filter ? filter : resultSet.$query.filter;
    };

    /**
     * @todo make a $fetchOnNestedCollection wrapping this one
     *
     * Applied to arrays of NgWakEntities
     *
     * @param {Object} options
     * @param {String} mode
     * @returns {$q.promise}
     */
    var $$fetch = function(options, mode) {
      var deferred, wakOptions = {}, that = this, skip, top;
      mode = (typeof mode === "undefined" || mode === "replace") ? "replace" : mode;
      //input check
      if (!options) {
        options = {};//@todo refresh collection when no param passed
      }
      if (typeof options.orderBy !== 'undefined') {
        throw new Error("orderBy can't be change on a $fetch (query collection's cached on server side)");
      }
      if (typeof options.select !== 'undefined') {
        throw new Error("select can't be change on a $fetch (query collection's cached on server side)");
      }
      //prepare options
      skip = options.start = typeof options.start === 'undefined' ? this.$query.start : options.start;
      top = options.pageSize = options.pageSize || this.$query.pageSize;
      if (options.params) {
        wakOptions.params = options.params;
      }
      //prepare the promise
      deferred = $q.defer();
      that = this;
      //update $fteching ($apply needed)
      rootScopeSafeApply(function() {
        that.$fetching = true;
      });
      wakOptions.onSuccess = function(event) {
        rootScopeSafeApply(function() {
          if(mode === 'replace') {
            that.length = 0;
          }
          event.entities.forEach(function(entity, i) {
            var ngWakEntity = createNgWakEntity(entity, { expend: true });
            if(mode === 'replace') {
              that[i] = ngWakEntity;
            } else if(mode === 'append') {
              that.push(ngWakEntity);
            } else {
              throw("Unknow mode " + mode + ", mode must be replace or append.");
            }
          });

          updateQueryInfos(that, options.pageSize || that.$_collection._private.pageSize, skip);
          that.$fetching = false;
          deferred.resolve(event);//@todo @warn what is passing on the resolve ?
        });
      };
      wakOptions.onError = function(event) {
        rootScopeSafeApply(function() {
          console.error('$fetch > getEntities > onError', event);
          that.$fetching = false;
          deferred.reject(event);
        });
      };
      //make the call
      this.$_collection.getEntities(skip, top, wakOptions);
      return deferred.promise;
    };

    /**
     * Return a JSON representation of an NgWak object (must clean the object before to avoid circular references)
     * @returns {String}
     */
    var $$toJSON = function() {

      var getCleanObject = function(obj) {
        var tmp, key, i;
        if(obj instanceof Array) {
          tmp = [];
          if(obj.length > 0) {
            for(i=0; i<obj.length; i++) {
              tmp.push(getCleanObject(obj[i]));
            }
          }
        }
        else{
          tmp = {};
          for(key in obj) {
            if(obj.hasOwnProperty(key) && key !== '$_entity' && key !== '$_deferred') {
              if(obj[key] instanceof Array || obj[key] instanceof NgWakEntityAbstract) {
                tmp[key] = getCleanObject(obj[key]);
              }
              else if(obj[key] !== null && typeof obj[key] !== 'undefined' && !obj[key].$_deferred) {
                tmp[key] = obj[key];
              }
            }
          }
        }
        return tmp;
      };

      var cleanObject = getCleanObject(this);

      return JSON.stringify(cleanObject);

    };

    /**
     * shortcuts for fetch - @todo spectify the exact return value when no more result
     * for the moment, when there is still data loaded, returns the promise from $fetch
     * if there is no data, returns a promise to be resolved with an object at noMore: true
     */

    var $$more = function() {
      var start, pageSize, totalCount, deferred;
      if(typeof this.$query !== 'undefined') {
        start = this.$query.start + this.$query.pageSize;
        pageSize = this.$query.pageSize;
        totalCount = this.$totalCount;
      }
      else{
        //case the query hasn't been done yet (only happens on nested collections), the first time, set arbitrary query
        start = 0;
        pageSize = DEFAULT_PAGESIZE_NESTED_COLLECTIONS;
        totalCount = DEFAULT_PAGESIZE_NESTED_COLLECTIONS;//as we don't know the total (we'll retrieve it at this call)
      }
      //prevent asking for non existant pages
      //@todo throw some kind of warning ?
      if(start >= totalCount) {
        deferred = new $q.defer();
        deferred.resolve({
          noMore: true
        });
        return deferred.promise;
      }
      else{
        return this.$fetch({
          'start': start,
          'pageSize': pageSize
        },'append');
      }
    };

    var $$nextPage = function() {
      var start, pageSize, totalCount, deferred;
      if(typeof this.$query !== 'undefined') {
        start = this.$query.start + this.$query.pageSize;
        pageSize = this.$query.pageSize;
        totalCount = this.$totalCount;
      }
      else{
        //case the query hasn't been done yet (only happens on nested collections), the first time, set arbitrary query
        start = 0;
        pageSize = DEFAULT_PAGESIZE_NESTED_COLLECTIONS;
        totalCount = DEFAULT_PAGESIZE_NESTED_COLLECTIONS;//as we don't know the total (we'll retrieve it at this call)
      }
      //prevent asking for non existant pages
      if(start >= totalCount) {
        deferred = new $q.defer();
        deferred.resolve({
          noMore: true
        });
        return deferred.promise;
      }
      else{
        return this.$fetch({
          'start': start,
          'pageSize': pageSize
        });
      }
    };

    var $$prevPage = function() {
      var start, pageSize, deferred, noMore;
      if(typeof this.$query !== 'undefined') {
        start = this.$query.start - this.$query.pageSize;
        pageSize = this.$query.pageSize;
      }
      else{
        deferred = new $q.defer();
        deferred.reject(new Error("No collection fetched to $prevPage() on."));
        console.error("No collection fetched to $prevPage() on.");
        return deferred.promise;
      }
      //prevent asking for non existant pages
      if(start < 0) {
        noMore = true;
        start = 0;
      }
      return this.$fetch({
        'start': start,
        'pageSize': pageSize
      }).then(function(e) {
        if(noMore === true) {
          e.noMore = true;
        }
        return e;
      });
    };

    var $$add = function() {
      console.log('$add method not yet implemented');
    };

    /**
     *
     * @param {Object} options
     * @returns {Array[NgWakEntity]|NgWakEntity}
     */
    var $$find = function(options) {
      var wakOptions = {},
          result = [],
          deferred;

      options = typeof(options) === 'object' && options || {};
      if (options.select) {
        wakOptions.autoExpand = options.select;
      }

      ['params', 'orderBy', 'pageSize'].forEach(function(opt) {
        if(options[opt] !== undefined) {
          wakOptions[opt] = options[opt];
        }
      });

      deferred = $q.defer();
      result.$promise = deferred.promise;

      rootScopeSafeApply(function() {
        result.$fetching = true;
      });

      wakOptions.onSuccess = function(event) {
        rootScopeSafeApply(function() {
          transform.wafEntityCollectionToNgWakEntityCollection(result, event.result, wakOptions);
          updateQueryInfos(result, result.$_collection._private.pageSize, 0, options.query);
          result.$fetching = false;
          event.result = result;
          deferred.resolve(event);
        });
      };
      wakOptions.onError = function(event) {
        rootScopeSafeApply(function() {
          console.error('$find > query > onError', event);
          result.$fetching = false;
          deferred.reject(event);
        });
      };

      this.query(options.filter || null, wakOptions);
      return result;
    };

    var $$findOne = function(key, options) {
      var wakOptions = {},
          deferred = $q.defer(),
          ngWakEntity = createNgWakEntity(new WAF.Entity(this, {}), { expend: true });

      options = typeof(options) === 'object' && options || {};

      wakOptions.forceReload = typeof options.forceReload === 'undefined' ? true : options.forceReload;
      wakOptions.select = options && options.select || undefined;

      ngWakEntity.$promise = deferred.promise;
      ngWakEntity.$fetching = true;

      wakOptions.onSuccess = function(event) {
        rootScopeSafeApply(function() {
          ngWakEntity.$_entity = event.entity;
          delete ngWakEntity.$_key;
          ngWakEntity.$fetching = false;
          event.result = ngWakEntity;
          deferred.resolve(event);
        });
      };
      wakOptions.onError = function(event) {
        rootScopeSafeApply(function() {
          console.error('$findOne > getEntity > error', event);
          ngWakEntity.$fetching = false;
          deferred.reject(event);
        });
      };

      this.getEntity(key, wakOptions);
      return ngWakEntity;
    };

    /** Code organization, heritage, objects used (todo : split this into multiple files which should be insject by dependency injection OR module) */

    var NgWakEntityAbstractPrototype = {
      /**
       * Constructor signature :
       * - (wafEntity) or (dataClass, key)
       * @returns {NgWakEntity}
       */
      init: function() {
        var dataClass;
        if(arguments[0] instanceof WAF.Entity) {
          this.$_entity = arguments[0];
          dataClass = this.$_entity.getDataClass();
        }
        else if(arguments[0] instanceof WAF.DataClass && typeof arguments[1] !== 'undefined') {
          this.$_key = arguments[1];
          dataClass = arguments[0];
        }
        this.$_dataClass = dataClass;
        Object.defineProperty(this, "$_dataClass", {
          enumerable: false,
          configurable: false,
          writable: false
        });
        Object.defineProperty(this, "$_entity", {
          enumerable: false,
          configurable: false,
          writable: true //@todo rechange it to true on freeze (necessary when no $_entity assigned but $_key)
        });
        dataClass.getAttributes().forEach(function(attr) {
          if(attr.kind === 'relatedEntity') {
            Object.defineProperty(this, attr.name, {
              enumerable: true,
              configurable: true,
              get: function() {
                return getRelatedEntity(this, attr.name);
              },
              set: function(ngWakEntity) {
                if(this.$_entity) {
                  rootScopeSafeApply(function() {
                    this.$_entity[attr.name].setValue(ngWakEntity.$_entity);
                  }.bind(this));
                }
              }
            });
          }
          else if(attr.kind === 'relatedEntities') {
            Object.defineProperty(this, attr.name, {
              enumerable: true,
              configurable: true,
              get: function() {
                if(! this._related) {
                  this._related = {};
                }

                if(this._related[attr.name]) {
                  return this._related[attr.name];
                }

                var result = [];
                if(this.$_entity[attr.name].value.__ENTITIES) {
                  result = this.$_entity[attr.name].value.__ENTITIES;
                  result.$_isLoaded = true;
                }

                result.$_collection = this.$_entity[attr.name];

                transform.addFrameworkMethodsToNestedCollection(result);

                this._related[attr.name] = result;
                return result;
              },
              set: function() {
                throw new Error("Can't set relatedEntities attribute " + attr.name + ".");
              }
            });
          }
          else if(attr.kind === 'calculated' || attr.kind === 'alias') {
            //no setters on those kind of attributes (in breaks the save if they are changed)
            //so there is an override that doesn't do any setValue but only sets a $_tempValue that won't be saved (and will be removed on $save)
            Object.defineProperty(this, attr.name, {
              enumerable: true,
              configurable: true,
              get: function() {
                if(this.$_entity) {
                  return this.$_entity[attr.name].getValue();
                }
              },
              //can only set when attr.readOnly !== true (if there is a setter server-side)
              set: function(newValue) {
                if(this.$_entity) {
                  if(attr.readOnly !== true) {
                    rootScopeSafeApply(function() {
                      this.$_entity[attr.name].setValue(newValue);
                    }.bind(this));
                  }
                  else{
                    throw new Error('Attribute ' + attr.name + ' is readOnly (you may want to declare a setter server-side).');
                  }
                }
              }
            });
          }
          //@warn specific case for object ? @warn check date types
          else{
            var descriptor = {
              enumerable: true,
              configurable: true,
              get: function() {
                if(this.$_entity) {
                  return this.$_entity[attr.name].getValue();
                }
              }
            };

            if(attr.type === 'image') {
              descriptor.set = function(newValue) {
                throw new Error('Attribute ' + attr.name + ' is an image, your must use $upload method to upload image.');
              };
            } else {
              descriptor.set = function(newValue) {
                if(this.$_entity) {
                  rootScopeSafeApply(function() {
                    this.$_entity[attr.name].setValue(newValue);
                  }.bind(this));
                }
              };
            }
            Object.defineProperty(this, attr.name, descriptor);

            // accessor to uri
            if(attr.type === 'image' && this[attr.name]) {
              Object.defineProperty(this[attr.name], 'uri', {
                enumerable: true,
                configurable: true,
                get: function() {
                  return this.__deferred && this.__deferred.uri;
                },
                set: function(newValue) {
                  throw new Error('Attribute ' + attr.name + ' is an image, your must use $upload method to upload image.');
                }
              });
            }
          }
        }.bind(this));
      },
      $key: function() {
        if(this.$_entity) {
          return this.$_entity.getKey();
        }
        else if(this.$_key) {
          return this.$_key;
        }
      },
      $stamp: function() {
        if(this.$_entity) {
          return this.$_entity.getStamp();
        }
      },
      $isNew: function() {
        if(this.$_entity) {
          return this.$_entity.isNew();
        }
      },
      $save: function() {
        if(!this.$_entity) {
          throw new Error("Can't $save() without pointer, please $fetch() before.");//@todo is is the right way ?
        }
        console.group('$save');
        var deferred, wakOptions = {}, that = this;
        //prepare the promise
        deferred = $q.defer();
        wakOptions.onSuccess = function(event) {
          rootScopeSafeApply(function() {
            console.log('save.onSuccess', 'event', event);
            transform.cleanNgWakEntityAfterSave(that);//remove $_tempValue on processed attributes
            deferred.resolve(event);
          });
        };
        wakOptions.onError = function(error) {
          rootScopeSafeApply(function() {
            console.error('save.onError','error', error);
            deferred.reject(error);
          });
        };
        this.$_entity.save(wakOptions);
        console.groupEnd();
        return deferred.promise;
      },
      $remove: function() {
        if(!this.$_entity) {
          throw new Error("Can't $remove() without pointer, please $fetch() before.");//@todo is is the right way ? (should be able to remove without fetching, based on $_key only)
        }
        console.group('$remove');
        var deferred, wakOptions = {}, that = this;
        //prepare the promise
        deferred = $q.defer();
        wakOptions.onSuccess = function(event) {
          rootScopeSafeApply(function() {
            console.log('remove.onSuccess', 'event', event);
            deferred.resolve(event);
          });
        };
        wakOptions.onError = function(error) {
          rootScopeSafeApply(function() {
            console.error('remove.onError','error', error);
            deferred.reject(error);
          });
        };
        this.$_entity.remove(wakOptions);
        console.groupEnd();
        return deferred.promise;
      },
      /**
       *
       * @param {Object} options
       * @returns {$q.promise}
       */
      $fetch: function(options) {
        var key, deferred, wakOptions = {}, dataClass;
        options = typeof options === 'undefined' ? {} : options;
        if(!this.$key()) {
          throw new Error("$fetch error - no key nor pointer was found");
        }
        key = this.$key();
        //prepare the promise
        deferred = $q.defer();

        var that = this;

        rootScopeSafeApply(function() {
          that.$fetching = true;
        });

        wakOptions.onSuccess = function(event) {
          rootScopeSafeApply(function() {
            that.$_entity = event.entity;
            //todo freeze $_entity
            delete that.$_key;
            that.$fetching = false;
            event.result = that;
            deferred.resolve(event);//@todo @warn make sure to pass correct entity inside resolve
          });
        };
        wakOptions.onError = function(event) {
          rootScopeSafeApply(function() {
            that.$fetching = false;
            deferred.resolve(event);
          });
        };
        wakOptions.forceReload = typeof options.forceReload === 'undefined' ? true : options.forceReload;

        this.$_dataClass.getEntity(key, wakOptions);
        //return the promise
        return deferred.promise;
      },
      //@todo check for regression according to changes
      $isLoaded: function() {
        if(this.$_entity) {
          return true;
        }
        else{
          return false;
        }
      },
      $toJSON: $$toJSON,
      $serverRefresh: function(options) {
        var deferred = $q.defer(),
          that = this;
        options = options || {};

        if(! this.$_entity) {
          throw new Error("Can't $serverRefresh() without pointer, please $fetch() before.");
        }

        var wakOptions = {
          onSuccess: function(e) {
            rootScopeSafeApply(function() {
              deferred.resolve(e);
            });
          },
          onError: function(e) {
            rootScopeSafeApply(function() {
              console.error('serverRefresh.error', e);
              deferred.reject(e);
            });
          }
        };

        if(options.forceReload !== undefined) {
          wakOptions.forceReload = options.forceReload;
        }

        this.$_entity.serverRefresh(wakOptions);
        return deferred.promise;
      }
    };

    var NgWakEntityAbstract = Class.extend(NgWakEntityAbstractPrototype);

    function getRelatedEntity(ngEntity, attr) {
      var dataClass = ngEntity.$_entity.getDataClass();

      if(dataClass.getAttributeByName(attr).kind !== 'relatedEntity' || ! ngEntity.$_entity || ! ngEntity.$_entity[attr]) {
        return;
      }

      if(! ngEntity._related) {
        ngEntity._related = {};
      }

      if(ngEntity._related[attr]) {
        return ngEntity._related[attr];
      } else {
        if(ngEntity.$_entity[attr].relEntity) {
          var wafEntity = ngEntity.$_entity[attr].relEntity;
          ngEntity._related[attr] = new NgWakEntityClasses[wafEntity.getDataClass().getName()](wafEntity);
        } else {
          dataClass = ngEntity.$_entity[attr].att.getRelatedClass();
          ngEntity._related[attr] = new NgWakEntityClasses[dataClass.getName()](dataClass, ngEntity.$_entity[attr].getRelatedKey());
        }
      }
    }

    function createNgWakEntity(wafEntity, options) {
        var name,
            ngWakEntity;

        options = options || {};

        name = wafEntity.getDataClass().getName();
        ngWakEntity = new NgWakEntityClasses[name](wafEntity, options.key);

        if(! options.expend) {
          return ngWakEntity;
        }

        ngWakEntity.$_dataClass.$_relatedAttributes.forEach(function(attr) {
          if(attr.kind !== 'relatedEntity' || ! ngWakEntity.$_entity[attr.name]) {
            return;
          }

          getRelatedEntity(ngWakEntity, attr.name);
        });
        return ngWakEntity;
    }

    var $fetchRelatedEntities = function(options, mode) {
      var wakOptions = {},
          deferred,
          that = this;

      mode = mode || 'replace';
      options = options || {};

      deferred = $q.defer();

      // prepare options
      wakOptions.skip = options.start = typeof options.start === 'undefined' ? (this.$query ? this.$query.start : 0) : options.start;
      wakOptions.top = options.pageSize = typeof options.pageSize === 'undefined' ? (this.$query ? this.$query.pageSize : DEFAULT_PAGESIZE_NESTED_COLLECTIONS) : options.pageSize;

      if (options.select) {
        wakOptions.autoExpand = options.select;
        console.warn("select can't be change on a $fetch (query collection's cached on server side in some way)");
      }

      if (options.orderBy) {
        wakOptions.orderby = options.orderBy;
        console.warn("orderBy can't be change on a $fetch (nested query collection's cached on server side in some way)");
      }

      // update $fetching ($apply needed)
      rootScopeSafeApply(function() {
        that.$fetching = true;
      });

      wakOptions.onSuccess = function(e) {
        rootScopeSafeApply(function() {
          if(mode === 'replace') {
            that.length = 0;
          }
          e.entityCollection.forEach({
            onSuccess: function(item) {
              var ngWakEntity = createNgWakEntity(item.entity, { expend: true });
              rootScopeSafeApply(function() {
                that.push(ngWakEntity);
              });
            },
            first: wakOptions.skip,
            limit: wakOptions.skip + wakOptions.top
          });

          that.$_isLoaded = true;
          updateCollectionQueryInfos(that, options.pageSize, options.start);
          that.$totalCount = e.entityCollection.length;
          that.$fetching = false;
          deferred.resolve(that);
        });
      };
      wakOptions.onError = function(event) {
        rootScopeSafeApply(function() {
          console.error('$fetch (nestedEntities) ) > onError', event);
          that.$fetching = false;
          deferred.reject(event);
        });
      };
      that.$_collection.getValue(wakOptions);
      return deferred.promise;
    };

    return $wakandaResult;
  }]);
