(function() {
  'use strict';

  var wakConnectorModule = angular.module('wakConnectorModule', []);

  wakConnectorModule.factory('wakConnectorService', ['$q', '$rootScope', function($q, $rootScope) {

      var ds = null;

      /** connexion part */

      var init = function(catalog) {
        console.log('>wakConnectorService init');
        wakToAngular.prepareWAF();
        var deferred = $q.defer();
        if (typeof catalog !== "string" || catalog === '*' || catalog === '') {
          catalog = null;
        }
        if (ds === null) {
          new WAF.DataStore({
            onSuccess: function(event) {
              ds = event.dataStore;
              wakToAngular.transformDatastore(ds);
              console.log('>wakConnectorService init > success', event, 'ds', ds);
              deferred.resolve(ds);
            },
            onError: function(event) {
              ds = null;
              console.error('>wakConnectorService init > error', event);
              deferred.reject(event);
            },
            catalog: catalog
          });
        }
        else {
          deferred.resolve(ds);
        }
        return deferred.promise;
      };

      var getDatastore = function() {
        if (ds !== null) {
          return ds;
        }
        else {
          throw new Error("The Datastore isn't initialized please execute .init(catalog) before you run your app.");
        }
      };

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

      /** private necessary objects */

      var wakEntityCollection = function() {

      };

      /** event transformation part */

      var wakToAngular = {
        prepareWAF: function() {
          WAF.DataClass.prototype.$find = $$find2;
        },
        transformDatastore: function(dataStore) {
          var dataClass;
          console.group('wakToAngular.transformDatastore()', dataStore);
          for (dataClass in dataStore) {
            if (dataStore.hasOwnProperty(dataClass) && dataClass !== "_private") {
              wakToAngular.transformDataClass(dataStore[dataClass]);
            }
          }
          console.groupEnd();
        },
        transformQueryEvent: function(event) {
          var result,
                  parsedXHRResponse;
          parsedXHRResponse = JSON.parse(event.XHR.response);
          result = parsedXHRResponse.__ENTITIES;
          result._collection = event.result;
          //add methods on result

          event.result = result;
          return event;
        },
        transformDataClass: function(dataClass) {
          console.group('wakToAngular.transformDataClass(%s)', dataClass._private.className, dataClass);
          console.groupEnd();
        },
        transformEntityArray: function(entityArray) {

        },
        transformWakAsyncToAngularPromise: function() {

        }
      };

      /** public methods */

      /**
       * 
       * @param {Object} options
       * @returns {$q.promise}
       */
      var $$find = function(options) {
        var deferred, wakOptions = {}, attributeList = null;
        //input check
        if (!options || typeof options !== "object") {
          throw new Error("Please pass an object as options");
        }
        //prepare options / map to the WAF.DataStore.toArray() signature
        if (options.select) {
          attributeList = options.select;
        }
        if (options.filter) {
          wakOptions.filterQuery = options.filter;
        }
        if (options.params) {
          wakOptions.params = options.params;
        }
        if (options.orderBy) {
          wakOptions.orderby = options.orderBy;// !!! watch the case
        }
        if (typeof options.offset !== "undefined") {
          wakOptions.skip = options.offset;
        }
        if (typeof options.limit !== "undefined") {
          wakOptions.top = options.limit;
        }
        if (typeof options.pageSize !== "undefined") {// !!! no pageSize on toArray
          wakOptions.pageSize = options.pageSize;
        }
        //prepare the promise
        deferred = $q.defer();
        wakOptions.onSuccess = function(event) {
          rootScopeSafeApply(function() {
            deferred.resolve(event);
          });
        };
        wakOptions.onError = function(event) {
          rootScopeSafeApply(function() {
            deferred.reject(event);
          });
        };
        //make the call
        options = null;
        this.toArray(attributeList, wakOptions);
        return deferred.promise;
      };

      /**
       * 
       * @param {Object} options
       * @returns {$q.promise}
       */
      var $$find2 = function(options) {
        var deferred, wakOptions = {}, query = null;
        //input check
        if (!options || typeof options !== "object") {
          throw new Error("Please pass an object as options");
        }
        //prepare options / map to the WAF.DataStore.toArray() signature
        if (options.select) {
          wakOptions.autoExpand = options.select;
        }
        if (options.filter) {
          query = options.filter;
        }
        if (options.params) {
          wakOptions.params = options.params;
        }
        if (options.orderBy) {
          wakOptions.orderby = options.orderBy;// !!! watch the case
        }
        if (typeof options.pageSize !== "undefined") {// !!! no pageSize on toArray
          wakOptions.pageSize = options.pageSize;
        }
        if (typeof options.pages) {
          wakOptions.pages = options.pages;
        }
        //prepare the promise
        deferred = $q.defer();
        wakOptions.onSuccess = function(event) {
          rootScopeSafeApply(function() {
            console.log('onSuccess', 'originalEvent', event);
            wakToAngular.transformQueryEvent(event);
            console.log('onSuccess', 'processedEvent', event);
            deferred.resolve(event);
          });
        };
        wakOptions.onError = function(event) {
          rootScopeSafeApply(function() {
            console.error('onError', event);
            deferred.reject(event);
          });
        };
        //make the call
        options = null;
        this.query(query, wakOptions);
        return deferred.promise;
      };

      /** returned object */

      return {
        init: init,
        getDatastore: getDatastore
      };

    }]);

})();