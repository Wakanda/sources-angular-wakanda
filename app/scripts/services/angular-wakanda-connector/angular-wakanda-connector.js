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

      /** event transformation part */

      var wakToAngular = {
        prepareWAF: function() {
          WAF.DataClass.prototype.$find = $$find;
          WAF.DataClass.prototype.$findOne = $$findOne;
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
        transformQueryEvent: function(event, onlyOne) {
          var result,
              parsedXHRResponse;
          parsedXHRResponse = JSON.parse(event.XHR.response);
          result = parsedXHRResponse.__ENTITIES;
          result.map(function(pojo){
            pojo.$_entity = new WAF.Entity(event.result.getDataClass(),pojo);//@warn what about deep nested entities ? (related ones)
            wakToAngular.addFrameworkMethodsToPojo(pojo);
            wakToAngular.addUserDefinedEntityMethodsToPojo(pojo);
            return pojo;
          });
          if(onlyOne !== true){
            result._collection = event.result;
            result.$fetch = $$fetch;
            result.$add = $$add;
          }
          else{
            if(result.length === 1){
              result = result[0];
            }
            else{
              result = null;
            }
          }
          event.result = result;
          console.log('after transformQueryEvent','event',event);
          return event;
        },
        transformDataClass: function(dataClass) {
          console.group('wakToAngular.transformDataClass(%s)', dataClass._private.className, dataClass);
          console.groupEnd();
        },
        transformEntityArray: function(entityArray) {

        },
        addFrameworkMethodsToPojo: function(pojo) {
          pojo.$save = $WakEntityMethods.$$save;
          pojo.$remove = $WakEntityMethods.$$remove;
          pojo.$syncPojoToEntity = $WakEntityMethods.$$syncPojoToEntity;
          pojo.$syncEntityToPojo = $WakEntityMethods.$$syncEntityToPojo;
        },
        addUserDefinedEntityMethodsToPojo: function(pojo) {
          var key;
          //add the public entity methods @todo wrap them up into promise
          if(pojo.$_entity && pojo.$_entity._private && pojo.$_entity._private.methods) {
            for(key in pojo.$_entity._private.methods){
              if(pojo.$_entity._private.methods.hasOwnProperty(key)){
                pojo[key+"Sync"] = function(){
                  return pojo.$_entity[key].apply(pojo.$_entity,arguments);
                };
                wakToAngular.wakandaUserDefinedEntityMethodToPromisableMethods(pojo, key, pojo.$_entity._private.methods[key]);
              }
            }
          }
          return pojo;
        },
        wakandaUserDefinedEntityMethodToPromisableMethods : function(pojo, methodName, method){
          
          pojo[methodName] = function(){
            var thatArguments = [],
                wakOptions = {},
                deferred;
            //duplicate arguments (simple assignation is not sure enough, his is to be sure to have a real array)
            if(arguments.length > 0){
              for(var i = 0; i<arguments.length; i++){
                thatArguments.push(arguments[i]);
              }
            }
            //frist sync the pojo to the entity
            pojo.$syncPojoToEntity();
            //prepare the promise
            deferred = $q.defer();        
            wakOptions.onSuccess = function(event) {
              rootScopeSafeApply(function() {
                console.log('userMethods.onSuccess', 'event', event);
                pojo.$syncEntityToPojo();//once the entity is save resync the result of the server with the pojo
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
            method.apply(pojo.$_entity,thatArguments);
            return deferred.promise;
          };
          
        }
      };

      /** public methods */
      
      /**
       * Applied to a WakEntity (POJO inside array result to what we add methods)
       */
      var $WakEntityMethods = {
        $$save : function(){
          console.group('$save');
          var deferred, wakOptions = {}, that = this;
          this.$syncPojoToEntity();
          //prepare the promise
          deferred = $q.defer();
          wakOptions.onSuccess = function(event) {
            rootScopeSafeApply(function() {
              console.log('save.onSuccess', 'event', event);
              that.$syncEntityToPojo();//once the entity is save resync the result of the server with the pojo
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
          return deferred.promise;
          console.groupEnd();
        },
        $$remove : function(){
          console.log("$remove() not yet implemented");
        },
        $$syncPojoToEntity : function(){
          var pojo = this, key;
          if(pojo.$_entity && pojo.$_entity._private && pojo.$_entity._private.values){
            for(key in pojo.$_entity._private.values){
              //only update modified values which are not related entities
              if(pojo.$_entity[key].getValue() !== pojo[key] && (pojo.$_entity[key] instanceof WAF.EntityAttributeSimple)){
                pojo.$_entity[key].setValue(pojo[key]);
              }
            }
          }
          console.log("$syncPojoToEntity (should it be public ?)");
        },
        $$syncEntityToPojo : function(){
          var pojo = this, key;
          if(pojo.$_entity && pojo.$_entity._private && pojo.$_entity._private.values){
            for(key in pojo.$_entity._private.values){
              //only update modified values which are not related entities
              if(pojo.$_entity[key].getValue() !== pojo[key] && (pojo.$_entity[key] instanceof WAF.EntityAttributeSimple)){
                pojo[key] = pojo.$_entity[key].getValue();
              }
            }
          }
          console.log("$syncEntityToPojo (should it be public ?)");
        }
      };

      /**
       * Applied to WAF.DataClass.prototype
       * 
       * @argument {Object} Simple JS object matching the dataclass representation
       * @returns {Object} POJO with $_entity pointer to WAF.Entity
       */
      var $$create = function(pojo){
        var entity = this.newEntity();
        for (var key in pojo){
          if(pojo.hasOwnProperty(key)){
            entity[key].setValue(pojo[key]);
          }
        }
        pojo.$_entity = entity;
        wakToAngular.addFrameworkMethodsToPojo(pojo);
        wakToAngular.addUserDefinedEntityMethodsToPojo(pojo);
        return pojo;
      };
      
      /**
       * Applied to arrays of pojos representing collections
       */
      var $$fetch = function(){
        console.log('$fetch method not yet implemented');
      };
      
      var $$add = function(){
        console.log('$add method not yet implemented');
      };

      /**
       * 
       * @param {Object} options
       * @returns {$q.promise}
       */
      var $$find = function(options) {
        var deferred, wakOptions = {}, query = null, onlyOne;
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
        onlyOne = options.onlyOne;
        wakOptions.onSuccess = function(event) {
          rootScopeSafeApply(function() {
            console.log('onSuccess', 'originalEvent', event);
            wakToAngular.transformQueryEvent(event, onlyOne);
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
      
      var $$findOne = function(id){
        return this.$find({
          filter:'ID = '+id,
          onlyOne : true
        });
      };

      /** returned object */

      return {
        init: init,
        getDatastore: getDatastore
      };

    }]);

})();