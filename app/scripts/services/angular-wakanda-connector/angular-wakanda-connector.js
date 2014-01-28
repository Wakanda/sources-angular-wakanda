//var g;

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

//      var WakEntityCollection = function(wakEntityCollection, entityCollectionMethods) {
//        wakEntityCollection = (wakEntityCollection && wakEntityCollection.length > 0 ? wakEntityCollection : false) || Object.create( Array.prototype );
//        wakEntityCollection = (Array.apply( wakEntityCollection, wakEntityCollection ) || wakEntityCollection);
//        WakEntityCollection.injectClassMethods( wakEntityCollection, entityCollectionMethods );
//        return wakEntityCollection;
//      };
//      
//      WakEntityCollection.injectClassMethods = function( wakEntityCollection, entityCollectionMethods ){
//        var method, originalPush;
//        //overload push
//        originalPush = Array.prototype.push;
//        WakEntityCollection.prototype.push = function(){
//          console.log('pushing',arguments);
//          originalPush.apply(this, arguments);
//        };
//        // Loop over all the prototype methods and add them to the new wakEntityCollection
//        for (method in WakEntityCollection.prototype){
//          // Make sure this is a local method.
//          if (WakEntityCollection.prototype.hasOwnProperty( method )){
//            // Add the method to the collection.
//            wakEntityCollection[ method ] = WakEntityCollection.prototype[ method ];
//          }
//        }
//        //then add the EntityCollectionMethods
//        for (method in entityCollectionMethods){
//          // Make sure this is a local method.
//          if (entityCollectionMethods.hasOwnProperty( method )){
//            // Add the method to the collection.
//            wakEntityCollection[ method ] = entityCollectionMethods[ method ];
//          }
//        }
//      };
//      
//      WakEntityCollection.prototype.$fetch = function(){
//        console.log('Not yet implemented $fetch method');
//      };
//      
//      g = WakEntityCollection;
//
//      var wakEntityMethods = {
//        $save : function(){
//          console.log('Not yet implemented $save method');
//        },
//        $remove : function(){
//          console.log('Not yet implemented $remove method');
//        }
//      };

      /** event transformation part */

      var wakToAngular = {
        prepareWAF: function() {
          WAF.DataClass.prototype.$find = $$find;
          WAF.DataClass.prototype.$create = $$create;
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
          result.map(function(pojo){
            console.log(pojo, event.result);
          });
          result._collection = event.result;
          
//          result = result.map(function(pojo) {
//             var entity = result._collection.getByKey(pojo.__ID);
//             pojo._entity = entity;
//          });
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
        addFrameworkMethodsToPOJO: function(pojo) {
          pojo.$save = $WakEntityMethods.$$save;
          pojo.$remove = $WakEntityMethods.$$remove;
        }
      };

      /** public methods */
      
      /**
       * Applied to a WakEntity (POJO inside array result to what we add methods)
       */
      var $WakEntityMethods = {
        $$save : function(){
          console.log("$save() not yet implemented");
        },
        $$remove : function(){
          console.log("$remove() not yet implemented");
        }
      };

      /**
       * Applied to WAF.DataClass.prototype
       * 
       * @argument {Object} Simple JS object matching the dataclass representation
       * @returns {Object} POJO with $_entity pointer to WAF.Entity
       */
      var $$create = function(data){
        var entity = this.newEntity();
        for (var key in data){
          if(data.hasOwnProperty(key)){
            entity[key].setValue(data[key]);
          }
        }
        data.$_entity = entity;
        wakToAngular.addFrameworkMethodsToPOJO(data);
        return data;
      };

      /**
       * 
       * @param {Object} options
       * @returns {$q.promise}
       */
      var $$find = function(options) {
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