var wakConnectorModule = angular.module('wakConnectorModule', []);

wakConnectorModule.factory('wakConnectorService', ['$q', '$rootScope', function($q, $rootScope) {

    var ds = null,
        NgWakEntityClasses = {};

    /** connexion part */

    var init = function(catalog) {
      console.log('>wakConnectorService init');
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
    
    /** Prepare DataStore, etc ... */
    
    var prepare = {
      wafDatastore : function(dataStore){
        //expose NgWak*Abstract prototypes
        dataStore.$Entity = NgWakEntityAbstract.prototype;
      },
      wafDataClasses : function(dataStore){
        var dataClassName;
        //add some to prototype
        WAF.DataClass.prototype.$find = $$find;
        WAF.DataClass.prototype.$findOne = $$findOne;
        WAF.DataClass.prototype.$create = $$create;
        
        //WARN !!!!!!!!!!!!!!!!!!!!! looping through too much infos which were added before
        //hint test for $* and _* properties when looping through arguments
        
        //loop through the dataClasses of the dataStore
        console.group('prepare.wafDataClasses()', dataStore);
        for (dataClassName in dataStore) {
          if (dataStore.hasOwnProperty(dataClassName) && dataClassName !== "_private" && /^\$.*/.test(dataClassName) === false) {            
            console.group('DataClass[%s]', dataStore[dataClassName]._private.className, dataStore[dataClassName]);
            prepare.wafDataClassAddMetas(dataStore[dataClassName]);
            prepare.wafDataClassCreateNgWakEntityClasses(dataStore[dataClassName]);
            console.groupEnd();
          }
        }
        console.groupEnd();
      },
      wafDataClassAddMetas : function(dataClass){
        var methodName,
            dataClassMethods = [],
            collectionMethods = [],
            entityMethods = [],
            attributes;

        for(methodName in dataClass._private.dataClassMethods){
          if(dataClass._private.dataClassMethods.hasOwnProperty(methodName)){
            dataClassMethods.push(methodName);
          }
        }
    
        for(methodName in dataClass._private.entityCollectionMethods){
          if(dataClass._private.entityCollectionMethods.hasOwnProperty(methodName)){
            collectionMethods.push(methodName);
          }
        }
    
        for(methodName in dataClass._private.entityMethods){
          if(dataClass._private.entityMethods.hasOwnProperty(methodName)){
            entityMethods.push(methodName);
          }
        }
        
        attributes = dataClass._private.attributesByName;
        
        dataClass.$attr = function(attrName){
          if(typeof attrName === "undefined"){
            return attributes;
          }
          else if(attrName && attributes[attrName]){
            return attributes[attrName];
          }
          else{
            return null;
          }
        };
        
        dataClass.$dataClassMethods = function(){
          return dataClassMethods;
        };
        
        dataClass.$collectionMethods = function(){
          return collectionMethods;
        };
        
        dataClass.$entityMethods = function(){
          return entityMethods;
        };
      },
      wafDataClassCreateNgWakEntityClasses : function(dataClass){
        var proto;
        proto = prepareHelpers.createUserDefinedEntityMethods(dataClass);
        NgWakEntityClasses[dataClass._private.className] = NgWakEntityAbstract.extend(proto);
        ds[dataClass._private.className].$Entity = NgWakEntityClasses[dataClass._private.className].prototype;
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
        
        for(methodName in dataClass._private.entityMethods){
          if(dataClass._private.entityMethods.hasOwnProperty(methodName)){
            proto[methodName+"Sync"] = function(){
              return this.$_entity[methodName].apply(this.$_entity,arguments);
            };
            prepareHelpers.wakandaUserDefinedMethodToPromisableMethods(proto, methodName, dataClass._private.entityMethods[methodName]);
          }
        }
        
        return proto;
      },
      createUserDefinedEntityCollectionMethods: function(dataClass) {
        var methodName, proto = {};
        
        for(methodName in dataClass._private.entityCollectionMethods){
          if(dataClass._private.entityCollectionMethods.hasOwnProperty(methodName)){
            proto[methodName+"Sync"] = function(){
              return this.$_collection[methodName].apply(this.$_entity,arguments);
            };
            prepareHelpers.wakandaUserDefinedMethodToPromisableMethods(proto, methodName, dataClass._private.entityCollectionMethods[methodName]);
          }
        }
        
        return proto;
      },
      wakandaUserDefinedMethodToPromisableMethods : function(proto, methodName, method){

        proto[methodName] = function(){
          var thatArguments = [],
              that,
              wakOptions = {},
              mode,
              deferred;
          //check if we are on an entity or a collection. The mode var will also be used as the name of the pointer later
          if(this instanceof NgWakEntityAbstract){
            mode = '$_entity';
          }
          else{
            mode = '$_collection';
          }
          //duplicate arguments (simple assignation is not sure enough, his is to be sure to have a real array)
          if(arguments.length > 0){
            for(var i = 0; i<arguments.length; i++){
              thatArguments.push(arguments[i]);
            }
          }
          //sync before request
          if(mode === '$_entity'){
            this.$syncPojoToEntity();
          }
          else{
            //@todo sync to the collection ???
          }
          //prepare the promise
          deferred = $q.defer();
          var that = this;
          wakOptions.onSuccess = function(event) {
            rootScopeSafeApply(function() {
              console.log('userMethods.onSuccess', 'event', event);
              //sync after request
              if(mode === '$_entity'){
                that.$syncEntityToPojo();
              }
              else{
                //@todo sync to the collection ???
              }
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
          method.apply(this[mode],thatArguments);
          return deferred.promise;
        };

      }
    };

    /** event transformation part */

    var transform = {
      /**
       * Transforms the WAF.Event event and adds a result attribute with the NgWakEntityCollection of the event
       * 
       * @param {WAF.Event} event
       * @param {Boolean} onlyOne
       * @returns {WAF.Event}
       */
      queryEventToNgWakEntityCollection : function(event, onlyOne){
        var rawEntities,
            parsedXhrResponse,
            userDefinedEntityCollectionMethods,
            result;
        parsedXhrResponse = JSON.parse(event.XHR.response);
        rawEntities = parsedXhrResponse.__ENTITIES;
        result = transform.jsonResponseToNgWakEntityCollection(event.result.getDataClass(), rawEntities);
        if(onlyOne !== true){
          userDefinedEntityCollectionMethods = prepareHelpers.createUserDefinedEntityCollectionMethods(event.result.getDataClass());
          console.log('userDefinedEntityCollectionMethods',userDefinedEntityCollectionMethods);
          for(var methodName in userDefinedEntityCollectionMethods){
            if(userDefinedEntityCollectionMethods.hasOwnProperty(methodName)){
              result[methodName] = userDefinedEntityCollectionMethods[methodName];
            }
          }
          result.$_collection = event.result;
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
        console.log('after transform.queryEventToNgWakEntityCollection','event',event);
        return event;
      },
      /**
       * 
       * @param {WAF.DataClass} dataClass
       * @param {Object} xhrResponse
       * @returns {Object}
       */
      jsonResponseToNgWakEntityCollection : function(dataClass,xhrResponse){
        var ngWakEntityCollection = [];
        console.log('dataClass',dataClass);
        xhrResponse.map(function(pojo){
          ngWakEntityCollection.push(dataClass.$create(pojo));
        });
        return ngWakEntityCollection;
      },
      fetchEventToNgWakEntityCollection : function(event, mode) {
        var result = [],
            dataClass = event.result._private.dataClass;
        console.log('transform.fetchEventToNgWakEntityCollection',event);
        event.entities.forEach(function(entity,index){
          result.push(dataClass.$create(entity));
        });
        console.log('transformFetchEvent','result',result);
        event.result = result;
      }
    };

    /** public methods */

    /**
     * Applied to WAF.DataClass.prototype
     * 
     * @argument {Object} Simple JS object matching the dataclass representation
     * @returns {NgWakEntity}
     */
    var $$create = function(pojo){
      var dataClassName = this._private.className,
          ngWakEntity,
          entity,
          key,
          attributes;
      ngWakEntity = new NgWakEntityClasses[dataClassName]();
      if(pojo instanceof WAF.Entity){
        entity = pojo;
        reccursiveFillNgWakEntityFromEntity(entity,ngWakEntity);
      }
      else {
        entity = this.newEntity();
        for (key in pojo){
          if(pojo.hasOwnProperty(key) && key === "__KEY"){
            ngWakEntity[key] = pojo[key];
            entity.setKey(pojo[key]);
          }
          else if(pojo.hasOwnProperty(key) && key === "__STAMP"){
            ngWakEntity[key] = pojo[key];
            entity.setStamp(pojo[key]);         
          }
          else if(pojo.hasOwnProperty(key) && entity.hasOwnProperty(key)){
            ngWakEntity[key] = pojo[key];
            //only setValue on an entity if the attribute is not a related one (at least for the moment)
            if(entity[key] instanceof WAF.EntityAttributeSimple){
              entity[key].setValue(pojo[key]);
            }
          }
        }
      }
      ngWakEntity.$_entity = entity;
      return ngWakEntity;
    };
    
    var reccursiveFillNgWakEntityFromEntity = function(entity, ngWakEntityNestedObject){
      var key,
          attributes = entity.getDataClass().$attr();
      //first init __KEY and __STAMP - to be compatible with data retrieved by $find
      ngWakEntityNestedObject.__KEY = entity.getKey();
      ngWakEntityNestedObject.__STAMP = entity.getStamp();
      //then init the values
      for(key in attributes){
        if(attributes[key].kind === "storage"){
          ngWakEntityNestedObject[key] = entity[key].getValue();
        }
        else if (attributes[key].kind === "relatedEntities") {
          ngWakEntityNestedObject[key] = entity[key].getRawValue();
        }
        else if (entity[key].relEntity) {
          ngWakEntityNestedObject[key] = {};
          reccursiveFillNgWakEntityFromEntity(entity[key].relEntity,ngWakEntityNestedObject[key]);
        }
      }
    };

    /**
     * Applied to arrays of pojos representing collections
     */
    var $$fetch = function(skip, top, mode){
      var deferred, wakOptions = {}, that = this;
      mode = (typeof mode === "undefined" || "replace") ? "replace" : mode;
      //prepare the promise
      deferred = $q.defer();
      wakOptions.onSuccess = function(event) {
        rootScopeSafeApply(function() {
          console.log('onSuccess', 'originalEvent', event);
          transform.fetchEventToNgWakEntityCollection(event);
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
      this.$_collection.getEntities(skip,top,wakOptions);
      return deferred.promise;
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
          transform.queryEventToNgWakEntityCollection(event, onlyOne);
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

    /** Code organization, heritage, objects used (todo : split this into multiple files which should be insject by dependency injection OR module) */
    
    var NgWakEntityAbstractPrototype = {
      $save : function(){
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
      $remove : function(){
        console.log("$remove() not yet implemented");
      },
      $syncPojoToEntity : function(){
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
      //@todo toutes variable n'atant pas object remonte
      $syncEntityToPojo : function(){
        var pojo = this, key;
        if(pojo.$_entity && pojo.$_entity._private && pojo.$_entity._private.values){
          for(key in pojo.$_entity._private.values){
            console.log(key,pojo.$_entity._private.values[key]);
            //only update modified values which are not related entities
            if(pojo.$_entity[key].getValue() !== pojo[key] && (pojo.$_entity[key] instanceof WAF.EntityAttributeSimple)){
              pojo[key] = pojo.$_entity[key].getValue();
            }
          }
        }
        console.log("$syncEntityToPojo (should it be public ?)");
      }
    };
    
    var NgWakEntityAbstract = Class.extend(NgWakEntityAbstractPrototype);

    /** returned object */

    return {
      init: init,
      getDatastore: getDatastore
    };

  }]);