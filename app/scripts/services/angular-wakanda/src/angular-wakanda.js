var wakanda = angular.module('wakanda', []);

wakanda.factory('$wakanda', ['$q', '$rootScope', '$http', function($q, $rootScope, $http) {

    var ds = null,
        NgWakEntityClasses = {},
        DEFAULT_PAGESIZE_NESTED_COLLECTIONS = 40,
        DEFAULT_CACHE_SIZE = 300,
        DEFAULT_CACHE_DEEP = 3;

    /** connexion part */

    /**
     * Init method to execute once on your application (that will retrieve the WAF catalog, a description of your db)
     * Asynchronous method which returns a promise, so easy to put in the route resolver or whatever way you want
     * 
     * @param {String} catalog
     * @returns {$q.promise}
     */
    var init = function(catalog) {
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
//            console.log('>$wakanda init > success', event, 'ds', ds);
            deferred.resolve(ds);
          },
          onError: function(event) {
            ds = null;
            console.error('>$wakanda init > error', event);
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

    /**
     * After the init part done, you can access to the datastore via this singleton method
     * 
     * @returns {event.dataStore}
     */
    var getDatastore = function() {
      if (ds !== null) {
        return ds;
      }
      else {
        throw new Error("The Datastore isn't initialized please execute .init(catalog) before you run your app.");
      }
    };

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
    
    /** base helpers */
    
    var helpers = {
      //deeply inspired by the one in AngularJS ngResource source code
      shallowClearAndCopy: function(src, dst) {
        dst = dst || {};

        angular.forEach(dst, function(value, key){
          delete dst[key];
        });

        for (var key in src) {
          if (src.hasOwnProperty(key)) {
            dst[key] = src[key];
          }
        }

        return dst;
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
//        console.group('prepare.wafDataClasses()', dataStore);
        for (dataClassName in dataStore) {
          if (dataStore.hasOwnProperty(dataClassName) && dataClassName !== "_private" && /^\$.*/.test(dataClassName) === false) {            
//            console.group('DataClass[%s]', dataStore[dataClassName].getName(), dataStore[dataClassName]);
            prepare.wafDataClassAddMetas(dataStore[dataClassName]);
            prepare.wafDataClassAddDataClassMethods(dataStore[dataClassName]);
            prepare.wafDataClassCreateNgWakEntityClasses(dataStore[dataClassName]);
            prepare.wafDataClassCreateRefCache(dataStore[dataClassName]);
//            console.groupEnd();
          }
        }
//        console.groupEnd();
      },
      wafDataClassAddMetas : function(dataClass){
        var methodInfo,
            dataClassMethods = [],
            collectionMethods = [],
            entityMethods = [],
            attributes,
            attributeName;
    
        angular.forEach(dataClass.getMethodList(),function(methodInfo){
          switch(methodInfo.applyTo){
            case "entity" :
              entityMethods.push(methodInfo.name);
              break;
            case "entityCollection" :
              collectionMethods.push(methodInfo.name);
              break;
            case "dataClass" :
              dataClassMethods.push(methodInfo.name);
              break;
          }
        });
        
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
        
        dataClass.$name = dataClass.getName();
        
        dataClass.$collectionName = dataClass.getCollectionName();
        
        for(attributeName in attributes){
          if(attributes[attributeName].identifying === true){
            dataClass.$_identifyingAttr = attributes[attributeName];
          }
        }
        
      },
      wafDataClassAddDataClassMethods : function(dataClass) {
        prepareHelpers.createUserDefinedDataClassMethods(dataClass);
      },
      wafDataClassCreateNgWakEntityClasses : function(dataClass){
        var proto;
        proto = prepareHelpers.createUserDefinedEntityMethods(dataClass);
        NgWakEntityClasses[dataClass.getName()] = NgWakEntityAbstract.extend(proto);
        ds[dataClass.getName()].$Entity = NgWakEntityClasses[dataClass.getName()].prototype;
      },
      wafDataClassCreateRefCache : function(dataClass){
        dataClass.$refCache = new NgWakEntityCache();
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
              return this.$_collection[methodName].apply(this.$_collection,arguments);
            };
            prepareHelpers.wakandaUserDefinedMethodToPromisableMethods(proto, methodName, dataClass._private.entityCollectionMethods[methodName]);
          }
        }
        return proto;
      },
      createUserDefinedDataClassMethods: function(dataClass) {
        angular.forEach(dataClass.$dataClassMethods(),function(methodName){
          dataClass[methodName] = function(){
            var defer = $q.defer();
            dataClass.callMethod({
              method: methodName,
              onSuccess: function(event){
                defer.resolve(event);
              },
              onError: function(error){
                console.error('userDataClassMethods.onError','error', error);
                defer.reject(error);
              },
              arguments : arguments.length > 0 ? Array.prototype.slice.call(arguments,0) : []
            });
            return defer.promise;
          };
          dataClass[methodName+'Sync'] = function(){
            return dataClass.callMethod({
              method: methodName,
              sync: true,
              arguments : arguments.length > 0 ? Array.prototype.slice.call(arguments,0) : []
            });
          };
        });
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
            if(typeof this.$_entity === 'undefined' || !this.$_entity instanceof WAF.Entity){
              throw new Error('Calling user defined method on unfetched entity, please call $fetch before or retrieve data on $find');
            }
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
//              console.log('userMethods.onSuccess', 'event', event);
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
          if(mode === '$_entity'){
            method.apply(this[mode],thatArguments);
          }
          else{
            if(!this.$_collection){
              throw new Error("Couldn't call user defined method on collection because no pointer on this collection");
            }
            method.apply(this[mode],thatArguments);//@todo maybe not on this[mode] ?...
          }
          return deferred.promise;
        };

      }
    };

    //@temporary study
    var collectionToNgWakEntityCollection = window.collectionToNgWakEntityCollection = function(wafEntityCollection,options){
      options = typeof options === 'undefined' ? {} : options;
      var result = typeof options.result === 'undefined' ? [] : options.result;
      var start = typeof options.start === 'undefined' ? 0 : options.start;
      var pageSize = typeof options.pageSize === 'undefined' ? DEFAULT_PAGESIZE_NESTED_COLLECTIONS : options.pageSize;
      var currentDataClass = wafEntityCollection.getDataClass();
      wafEntityCollection.forEachInCache({
        onSuccess: function(item){
          console.log(item);
        },
        first: start,
//        skip: start,
        limit: start+pageSize
      });
      var reccursiveCollectionToNgWakEntityCollection = function(wafEntityCollection){
        
      };
    };
    
    //@temporary study
    var entityToNgWakEntity = function(wafEntity){
      var currentDataClass = wafEntity.getDataClass();
      var attributes = currentDataClass.$attr();
      var wakEntity = new NgWakEntityClasses[currentDataClass.$name]();
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
//            userDefinedEntityCollectionMethods,
            result;
        parsedXhrResponse = JSON.parse(event.XHR.response);
        rawEntities = parsedXhrResponse.__ENTITIES;
//        console.log('rawEntities',rawEntities);
        result = transform.jsonResponseToNgWakEntityCollection(event.result.getDataClass(), rawEntities);
        if(onlyOne !== true){
          result.$_collection = event.result;
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
//        console.log('after transform.queryEventToNgWakEntityCollection','event',event);
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
        xhrResponse.map(function(pojo){
          ngWakEntityCollection.push(dataClass.$create(pojo));
        });
        return ngWakEntityCollection;
      },
      fetchEventToNgWakEntityCollection : function(event) {
        var result = [],
            dataClass = event.result._private.dataClass;
//        console.log('transform.fetchEventToNgWakEntityCollection',event);
        event.entities.forEach(function(entity,index){
          result.push(dataClass.$create(entity));
        });
//        console.log('transformFetchEvent','result',result);
        event.result = result;
      },
      asyncResult : function(data, result, promise){
        //@todo change the collection part (it erase the previous added methods)
        var userDefinedEntityCollectionMethods;
        if (data instanceof Array) {
          //update values
          result.length = 0;
          angular.forEach(data, function(item) {
            result.push(item);
          });
          //update $_collection pointer
          result.$_collection = data.$_collection;
          //update framework collection methods
          transform.addFrameworkMethodsToRootCollection(result);
          //add user defined methods for only on the root collection
          transform.addUserDefinedMethodsToCollection(result,true);
          //update promise
          result.$promise = promise;
        } else {
          //case it's a unique entity and the pointer is missing
          if(typeof result.$_entity === "undefined" && typeof data.$_entity !== "undefined"){
            result.$_entity =data.$_entity;
          }
          helpers.shallowClearAndCopy(data, result);
          result.$promise = promise;
        }
      },
      addUserDefinedMethodsToCollection: function(result, root){
        var userDefinedEntityCollectionMethods,
                dataClass = null;
        //if in anyway the private $_collection pointer isn't here, simply return the object
        //@todo optimize conditionals
        if(root === true){
          if(typeof result.$_collection !== 'undefined'){
            dataClass = result.$_collection.getDataClass();
          }
        }
        else if(root === false){
          if(typeof result.$_collection !== 'undefined' && result.$_collection.relEntityCollection !== 'undefined'){
            dataClass = result.$_collection.relEntityCollection;
          }
        }
        //if couldn(t retrieve the dataClass (there may not be always a pointer alredy) - return the object untouched
        if(dataClass === null){
          return result;
        }
        //add user defined methods for only on the root collection
        userDefinedEntityCollectionMethods = prepareHelpers.createUserDefinedEntityCollectionMethods(dataClass);
        for(var methodName in userDefinedEntityCollectionMethods){
          if(userDefinedEntityCollectionMethods.hasOwnProperty(methodName)){
            result[methodName] = userDefinedEntityCollectionMethods[methodName];
          }
        }
        return result;
      },
      addFrameworkMethodsToRootCollection: function(result){
        result.$fetch = $$fetch;
        result.$add = $$add;
        result.$more = $$more;
        result.$nextPage = $$nextPage;
        result.$prevPage = $$prevPage;
        result.$totalCount = result.$_collection.length;
        result.$toJSON = $$toJSON;
      },
      addFrameworkMethodsToNestedCollection : function(result){
        result.$fetch = $fetchOnNestedCollection;
        result.$more = $$more;
        result.$nextPage = $$nextPage;
        result.$prevPage = $$prevPage;
        result.$toJSON = $$toJSON;
        result.$isLoaded = $$isLoadedOnNestedCollection;
        result.$totalCount = null;
      }
    };

    /** public methods */

    /**
     * Applied to WAF.DataClass.prototype
     * 
     * @argument {Object} pojo Simple JS object matching the dataclass representation
     * @returns {NgWakEntity}
     */
    var $$create = function(pojo){
      var dataClassName = this.getName(),
          ngWakEntity;
      pojo = typeof pojo === "undefined" ? {} : pojo;
      ngWakEntity = new NgWakEntityClasses[dataClassName]();
      reccursiveFillNgWakEntityFromEntity(pojo, ngWakEntity, this);
      return ngWakEntity;
    };
    
    /**
     * Fills ngWakEntityNestedObject with entity (deep mode)
     * Param entity can as well be an Object or a WAF.Entity
     * 
     * @param {Object | WAF.Entity} entity
     * @param {NgWakEntity} ngWakEntityNestedObject
     * @param {WAF.DataClass} currentDataClass
     * @returns {undefined}
     */
    var reccursiveFillNgWakEntityFromEntity = function(entity, ngWakEntityNestedObject, currentDataClass){
      var key, defferedKey,
          attributes = currentDataClass.$attr(),
          isEntityWafEntity = entity instanceof WAF.Entity,
          tmpDeferredInfos,
          imageDeferredAttributesMapping = { //use this hash to change the name of the attributes from the json into the NgWakEntity (not declared attribute will kep same name)
            'uri' : 'src'
          };
  
      //if no data or entity, do nothing - @todo check
      if(entity === null || typeof entity === 'undefined'){
        return;
      }
      //attach $_entity pointer (which is an instance of WAF.Entity) from the param entity whatever it is (a pojo or a WAF.Entity) but not on null or empty entities
      else if(isEntityWafEntity === false){
        //if this is a deferred, keep a private reference and add a $fetch method - withour creating the $_entity
        if(entity.__deferred){
          //case from direct XHR
          ngWakEntityNestedObject.$_deferred = {
            uri : entity.__deferred.uri,
            dataClass : currentDataClass
          };
        }
        else if(entity.value && entity.value.__deferred){
          //case from getValue (via DataProvider)
          ngWakEntityNestedObject.$_deferred = {
            uri : entity.value.__deferred.uri,
            dataClass : currentDataClass
          };
        }
        else{
          //only create the $_entity when data is passed
          ngWakEntityNestedObject.$_entity = new WAF.Entity(currentDataClass, entity);
        }
      }
      else{
        ngWakEntityNestedObject.$_entity = entity;
      }

      // set __KEY and __STAMP on the NgWakEntity whatever entity is (a pojo or a WAF.Entity), but only if present (dont set it on null or empty entities)
      if(isEntityWafEntity){
        ngWakEntityNestedObject.__KEY = entity.getKey();
        ngWakEntityNestedObject.__STAMP = entity.getStamp();
      }
      else{
        if(typeof entity.__KEY !== 'undefined'){
          ngWakEntityNestedObject.__KEY = entity.__KEY;
        }
        if(typeof entity.__STAMP !== 'undefined'){
          ngWakEntityNestedObject.__STAMP = entity.__STAMP;
        }
      }
      
      //init the values - same way as above : set the values on the NgWakEntity instance from entity whatever entity is (a pojo or a WAF.Entity)
      for(key in attributes){
        if(typeof entity[key] !== 'undefined'){
          if(attributes[key].kind === "storage" || attributes[key].kind === "calculated" || attributes[key].kind === "alias"){
            if(attributes[key].type === "image"){
              ngWakEntityNestedObject[key] = {};
              tmpDeferredInfos = isEntityWafEntity ? entity[key].getValue() : entity[key];
              if(tmpDeferredInfos && tmpDeferredInfos.__deferred){
                for (defferedKey in tmpDeferredInfos.__deferred){
                  ngWakEntityNestedObject[key][imageDeferredAttributesMapping[defferedKey] ? imageDeferredAttributesMapping[defferedKey] : defferedKey] = tmpDeferredInfos.__deferred[defferedKey];
                }
              }
              else{
                ngWakEntityNestedObject[key][imageDeferredAttributesMapping['uri']] = null;
              }
              ngWakEntityNestedObject[key].$upload = $$upload;
            }
            else{
              if(isEntityWafEntity){
                ngWakEntityNestedObject[key] = entity[key].getValue();
              }
              else if(typeof entity[key] !== 'undefined'){
                ngWakEntityNestedObject[key] = isEntityWafEntity ? entity[key].getValue() : entity[key];
                if(attributes[key].type === "date" && ngWakEntityNestedObject[key] !== null && ngWakEntityNestedObject[key] instanceof Date === false){
                  ngWakEntityNestedObject[key] = new Date(ngWakEntityNestedObject[key]);
                }
              }
            }
          }
          else if (attributes[key].kind === "relatedEntities") {
            if(entity[key].__ENTITIES){
              ngWakEntityNestedObject[key] = transform.jsonResponseToNgWakEntityCollection(attributes[key].getRelatedClass(),entity[key].__ENTITIES);
              transform.addFrameworkMethodsToNestedCollection(ngWakEntityNestedObject[key]);
            }
            else if(entity[key].__deferred){
              ngWakEntityNestedObject[key] = [];
              ngWakEntityNestedObject[key].$_deferred = {
                uri : entity[key].__deferred.uri,
                dataClass : attributes[key].getRelatedClass(),
                attr : key
              };
              transform.addFrameworkMethodsToNestedCollection(ngWakEntityNestedObject[key]);
            }
            //@todo @warn - this part is for the setValue on collection, reactivate it when getting back to it - see also $fetchOnNestedCollection method
            if(ngWakEntityNestedObject[key]){
              ngWakEntityNestedObject[key].$_collection = ngWakEntityNestedObject.$_entity[key];
            }
//            console.log('ngWakEntityNestedObject.$_entity[key]',ngWakEntityNestedObject.$_entity[key]);
//            ngWakEntityNestedObject[key].$_collection = ngWakEntityNestedObject.$_entity[key].relEntityCollection;
//            ngWakEntityNestedObject[key].$_parent = ngWakEntityNestedObject.$_entity;
//            console.log('ngWakEntityNestedObject.$_entity',ngWakEntityNestedObject.$_entity,'ngWakEntityNestedObject.$_entity.staff',ngWakEntityNestedObject.$_entity.staff);
            //end of the @todo @warn part
            //@todo whatever add collection methods - may not be possible - done before
          }
          else if (attributes[key].kind === "relatedEntity") {
            //console.log('relatedEntity',key,entity,entity[key]);
            //@warn the error is here .relEntity doesn't exist
            //debugger;
            ngWakEntityNestedObject[key] = new NgWakEntityClasses[(isEntityWafEntity && entity[key].relEntity) ? entity[key].relEntity.getDataClass().$name : ds[currentDataClass.$name].$attr(key).type]();
            if(isEntityWafEntity && entity[key].relEntity !== null){
              reccursiveFillNgWakEntityFromEntity(entity[key].relEntity,ngWakEntityNestedObject[key],entity[key].relEntity.getDataClass());
            }
            else{
//              if(entity[key].getValue) console.warn('deferred1',key,entity[key].value,entity[key].getRawValue());
//              if(entity[key].__deferred) console.warn('deferred2',key,entity[key].__deferred);
//              console.log(key,entity[key],ngWakEntityNestedObject[key],ds[ds[currentDataClass.$name].$attr(key).type]);
              reccursiveFillNgWakEntityFromEntity(entity[key],ngWakEntityNestedObject[key],ds[ds[currentDataClass.$name].$attr(key).type]);
            }
          }
        }
      }
    };
    
    var $$upload = function(file){
      console.log('$upload not yet implemented');
    };
    
    /**
     * 
     * @param {Array[NgWakEntity} resultSet (nested collection)
     * @param {Int} pageSize
     * @param {Int} start
     * @returns {undefined}
     */
    var updateCollectionQueryInfos = function(resultSet, pageSize, start){
      if(typeof resultSet.$query === 'undefined'){
        resultSet.$query = {};
      }
      resultSet.$query.pageSize   = pageSize;
      resultSet.$query.start      = start;
    };
    
    //@todo change the pageSize to the collection length
    var $fetchOnNestedCollection = function(options, mode){
      //@todo take mode param in account for pagination / also $query
      //@todo bug inside getValue + forEach with boundaries
      //@todo add collection methods if not present
      console.warn('This method is currently under refactoring');
      var that = this,
          deferred = $q.defer(),
          wakOptions = {};
      mode = (typeof mode === "undefined" || mode === "replace") ? "replace" : mode;
      if(!that.$_collection){
        deferred.reject('Missing $_collection private pointer (WAF.EntityAttributeRelatedSet), check if you used $find or $fetch to load the collection');
        console.warn('Missing $_collection private pointer (WAF.EntityAttributeRelatedSet), check if you used $find or $fetch to load the collection');
      }
      else{
        //options check
        if(!options){
          options = {};
        }
        //options checking
        if (typeof options.orderBy !== 'undefined') {
          console.warn("orderBy can't be change on a $fetch (nested query collection's cached on server side in some way)");
        }
        if (typeof options.select !== 'undefined') {
          console.warn("select can't be change on a $fetch (query collection's cached on server side in some way)");
        }
        //prepare options
        wakOptions.skip = options.start = typeof options.start === 'undefined' ? (this.$query ? this.$query.start : 0) : options.start;
        wakOptions.top = options.pageSize = typeof options.pageSize === 'undefined' ? (this.$query ? this.$query.pageSize : DEFAULT_PAGESIZE_NESTED_COLLECTIONS) : options.pageSize;
        //prepare unhandled options @warn
        if (options.select) {
          wakOptions.autoExpand = options.select;
        }
        if (options.orderBy) {
          wakOptions.orderby = options.orderBy;
        }
        //update $fetching ($apply needed)
        rootScopeSafeApply(function() {
          that.$fetching = true;
        });
        console.log('>$fetch on nestedCollection','options',options);
//        wakOptions.method = 'subentityset';
//        wakOptions.forceReload = true;
        wakOptions.onSuccess = function(e){
          console.log('$fetchOnNestedCollection > onSuccess','e',e);
          rootScopeSafeApply(function(){
//            console.group('$fetchOnNestedCollection > onSuccess','e',e);
            if(mode === 'replace'){
              that.length = 0;
            }
            e.entityCollection.forEach({
              onSuccess : function(item){
                rootScopeSafeApply(function(){
                  console.log(item.position,item.entity,that.$_collection.relEntityCollection.getDataClass());
                  that.push(that.$_collection.relEntityCollection.getDataClass().$create(item.entity));
                });
              },
              atTheEnd: function(e){
                console.log('atTheEnd','e',e);
              },
              //@todo not always passed
              first : wakOptions.skip,
              limit : wakOptions.skip + wakOptions.top
            });
//            console.groupEnd();
            //remove the deferred pointer to show that the collection has been loaded anyway
            delete that.$_deferred;
            updateCollectionQueryInfos(that, options.pageSize, options.start);
            that.$totalCount = e.entityCollection.length;//@todo check if not e.entityCollection.length or e.result.length
            that.$fetching = false;
            deferred.resolve(that);
          });
        };
        wakOptions.onError = function(event){
          rootScopeSafeApply(function() {
            console.error('$fetch (nestedEntities) ) > onError', event);
            that.$fetching = false;
            deferred.reject(event);
          });
        };
        console.log('wakOptions',wakOptions);
        that.$_collection.getValue(wakOptions);
      }
      return deferred.promise;
    };
    
    $$isLoadedOnNestedCollection = function(){
      if(this.$_deferred){
        return false;
      }
      else{
        return true;
      }
    };
    
    /**
     * 
     * @param {Array[NgWakEntity]} resultSet
     * @param {Int} pageSize
     * @param {Int} start
     * @param {String} filter (won't be updated if null or '') @optional
     * @returns {undefined}
     */
    var updateQueryInfos = function(resultSet, pageSize, start, filter){
      if(typeof resultSet.$query === 'undefined'){
        resultSet.$query = {};
      }
      resultSet.$query.pageSize   = pageSize;
      resultSet.$query.start      = start;
      resultSet.$query.filter     = filter ? filter : resultSet.$query.filter;
    };

    /**
     * Applied to arrays of pojos representing collections
     * 
     * @param {Object} options
     * @param {String} mode
     * @returns {$q.promise}
     */
    var $$fetch = function(options, mode){
      var deferred, wakOptions = {}, that = this, skip, top;
      mode = (typeof mode === "undefined" || mode === "replace") ? "replace" : mode;
      //input check
      if (!options) {
        options = {};
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
//      console.log(wakOptions);
      //prepare the promise
      deferred = $q.defer();
      var that = this;
      //update $fteching ($apply needed)
      rootScopeSafeApply(function() {
        that.$fetching = true;
      });
      wakOptions.onSuccess = function(event) {
        rootScopeSafeApply(function() {
//          console.log('onSuccess', 'originalEvent', event);
          transform.fetchEventToNgWakEntityCollection(event);
          if(mode === 'replace'){
            that.length = 0;
            for(var i=0; i<event.result.length; i++){
              that[i] = event.result[i];
            }
          }
          else if(mode === 'append'){
            for(var i=0; i<event.result.length; i++){
//              console.log(event.result[i]);
              that.push(event.result[i]);
            }
          }
          updateQueryInfos(that, options.pageSize || that.$_collection._private.pageSize, skip);
//          console.log('onSuccess', 'processedEvent', event);
          that.$fetching = false;
          deferred.resolve(event);
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
      this.$_collection.getEntities(skip,top,wakOptions);
      return deferred.promise;
    };
    
    /**
     * Return a JSON representation of an NgWak object (must clean the object before to avoid circular references)
     * @returns {String}
     */
    $$toJSON = function(){

      var getCleanObject = function(obj){
        var tmp, key, i;
        if(obj instanceof Array){
          tmp = [];
          if(obj.length > 0){
            for(i=0; i<obj.length; i++){
              tmp.push(getCleanObject(obj[i]));
            }
          }
        }
        else{
          tmp = {};
          for(key in obj){
            if(obj.hasOwnProperty(key) && key !== '$_entity' && key !== '$_deferred'){
              if(obj[key] instanceof Array || obj[key] instanceof NgWakEntityAbstract){
                tmp[key] = getCleanObject(obj[key]);
              }
              else if(obj[key] !== null && typeof obj[key] !== 'undefined' && !obj[key].$_deferred){
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
     * if there is no data, returns a promise to be resolved with an object at noMore : true
     */
    
    var $$more = function(){
      var start, pageSize, totalCount, deferred;
      if(typeof this.$query !== 'undefined'){
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
      if(start >= totalCount){
        deferred = new $q.defer();
        deferred.resolve({
          noMore : true
        });
        return deferred.promise;
      }
      else{
        return this.$fetch({
          'start' : start,
          'pageSize' : pageSize
        },'append');
      }
    };
    
    var $$nextPage = function(){
      var start, pageSize, totalCount, deferred;
      if(typeof this.$query !== 'undefined'){
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
      if(start >= totalCount){
        deferred = new $q.defer();
        deferred.resolve({
          noMore : true
        });
        return deferred.promise;
      }
      else{
        return this.$fetch({
          'start' : start,
          'pageSize' : pageSize
        });
      }
    };
    
    var $$prevPage = function(){
      var start, pageSize, deferred, noMore;
      if(typeof this.$query !== 'undefined'){
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
      if(start < 0){
        noMore = true;
        start = 0;
      }
      return this.$fetch({
        'start' : start,
        'pageSize' : pageSize
      }).then(function(e){
        if(noMore === true){
          e.noMore = true;
        }
        return e;
      });
    };

    var $$add = function(){
      console.log('$add method not yet implemented');
    };

    /**
     * 
     * @param {Object} options
     * @returns {Array[NgWakEntity]|NgWakEntity}
     */
    var $$find = function(options) {
      var deferred, wakOptions = {}, query = null, onlyOne, result;
      //input check
      if (!options || typeof options !== "object") {
        options = {};
      }
      //prepare options
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
      //@todo must remain private
//      if (typeof options.pages) {
//        wakOptions.pages = options.pages;
//      }
      //prepare the returned object
      onlyOne = !!options.onlyOne;
      if(onlyOne){
        result = new NgWakEntityClasses[this.$name]();
      }
      else{
        result = [];
      }
      //prepare the promise
      deferred = $q.defer();
      result.$promise = deferred.promise;
      //update $fteching ($apply needed)
      rootScopeSafeApply(function() {
        result.$fetching = true;
      });
//      console.log('RESULT',result);
      wakOptions.onSuccess = function(event) {
        rootScopeSafeApply(function() {
//          console.log('onSuccess', 'originalEvent', event);
          transform.queryEventToNgWakEntityCollection(event, onlyOne);
          transform.asyncResult(event.result, result, deferred.promise);
          if(onlyOne === false){
            updateQueryInfos(result, result.$_collection._private.pageSize, 0, query);
          }
//          console.log('onSuccess', 'processedEvent', event, result.$_collection ? result.$_collection : result.$_entity);
          result.$fetching = false;
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
      //make the call
      options = null;
      this.query(query, wakOptions);
      return result;
    };

    //@todo identify the correct key field (not ID by default)
    var $$findOne = function(id,options){
      options = typeof options === 'undefined' ? {} : options;
      options.filter = this.$_identifyingAttr.name+' = '+id;
      options.onlyOne = true;
      return this.$find(options);
    };

    /** Code organization, heritage, objects used (todo : split this into multiple files which should be insject by dependency injection OR module) */
    
    var NgWakEntityAbstractPrototype = {
      init: function(){
        Object.defineProperty(this, "$_entity", {
          enumerable: false,
          configurable: false,
          writable: true
        });
      },
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
        console.groupEnd();
        return deferred.promise;
      },
      $remove : function(){
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
      $syncPojoToEntity : function(){
        console.group('$syncPojoToEntity');
        var pojo = this, key, infos, info;
        if(pojo.$_entity && pojo.$_entity._private && pojo.$_entity._private.values){
          for(key in pojo.$_entity._private.values){
            //only update modified values which are not related entities
            if(pojo.$_entity[key].getValue() !== pojo[key] && (pojo.$_entity[key] instanceof WAF.EntityAttributeSimple)){
              pojo.$_entity[key].setValue(pojo[key]);
            }
            //@todo to sync related attributes (it's a start)
//            //update attribute related (only if is loaded for the moment)
//            if((pojo.$_entity[key] instanceof WAF.EntityAttributeRelated) && pojo[key].$isLoaded()){
//              console.log('related',key,'pojo.$_entity[key]',pojo.$_entity[key],'pojo[key]',pojo[key]);
//              console.log('$_entity',pojo.$_entity[key].getValue(),'pojo',pojo[key]);
//              console.log(pojo.$_entity[key].relEntity.getDataClass().$attr());
//              infos = pojo.$_entity[key].relEntity.getDataClass().$attr();
//              //find the id field's name
//              for(info in infos){
//                if(infos[info].identifying === true){
//                  console.log(info,'pojo',pojo[key][info],'$_entity',pojo.$_entity[key][info]);
//                }
//              }
//            }
          }
        }
        console.groupEnd();
      },
      //@todo toutes variable n'atant pas object remonte
      $syncEntityToPojo : function(){
        var pojo = this, key;
        if(pojo.$_entity && pojo.$_entity._private && pojo.$_entity._private.values){
          for(key in pojo.$_entity._private.values){
//            console.log(key,pojo.$_entity._private.values[key]);
            //only update modified values which are not related entities
            if(pojo.$_entity[key].getValue() !== pojo[key] && (pojo.$_entity[key] instanceof WAF.EntityAttributeSimple)){
              pojo[key] = pojo.$_entity[key].getValue();
            }
          }
        }
        pojo.__KEY = pojo.$_entity.getKey();
        pojo.__STAMP = pojo.$_entity.getStamp();
//        console.log("$syncEntityToPojo (should it be public ?)");
      },
      /**
       * If entity not loaded, fetched is from the server with the $_deferred.uri
       * If entity is loaded, executes a serverRefresh
       * 
       * Both ways, makes sure your entity is up to date
       * 
       * @returns {$q.promise}
       */
      $fetch : function(){
        var deferred, that = this, result, wakOptions = {};
        //prepare the promise
        deferred = $q.defer();
        
        //2 cases
        //- serverRefresh if $_entity
        //- fetch on deferred if $_deferred
        
        if(this.$_entity){
          wakOptions.onSuccess = function(event) {
            rootScopeSafeApply(function() {
              result = that.$_entity.getDataClass().$create(event.entity);
              //populate current object
              for(var key in result){
                if(result.hasOwnProperty(key)){
                  that[key] = result[key];
                }
              }
              deferred.resolve(result);
            });
          };
          wakOptions.onError = function(error) {
            rootScopeSafeApply(function() {
              console.error('$fetch > Error while serverRefresh', error);
              deferred.reject('$fetch > Error while serverRefresh'+error);
            });
          };
          this.$_entity.serverRefresh(wakOptions);
          return deferred.promise;
        }
        else if(this.$_deferred){
          $http({method: 'GET', url: this.$_deferred.uri})
            .success(function(data, status, headers, config){
              result = that.$_deferred.dataClass.$create(data);
              //populate current object
              for(var key in result){
                if(result.hasOwnProperty(key)){
                  that[key] = result[key];
                }
              }
              //remove the deferred pointer which isn't needed any more
              delete that.$_deferred;
              deferred.resolve(result);
            })
            .error(function(data, status, headers, config){
              console.error('$fetch > Error while fetching deferred entity',data, 'status',status);
              deferred.reject('$fetch > Error while fetching deferred entity'+data);
            });
        }
        else{
          throw new Error('Couldn\'t fetch, an error occured, no $_entity or $_deferred');
        }
        return deferred.promise;
      },
      $isLoaded : function(){
        if(this.$_entity){
          return true;
        }
        else{
          return false;
        }
      },
      $toJSON : $$toJSON
      
    };
    
    var NgWakEntityAbstract = Class.extend(NgWakEntityAbstractPrototype);
    
    /** cache @warning work in progress
     * tried to matche as much of the API of the DataProvider's original cache I could 
     * while sticking with the specs of the angular-wakanda connector
     */
    
    /**
     * 
     * @param {Object} options
     * @returns {NgWakEntityCache}
     */
    var NgWakEntityCache = function(options){
      
      options = typeof options === 'undefined' ? {} : options;
      
      this.maxEntities = options.maxEntities || DEFAULT_CACHE_SIZE;
      this.deep = options.deep || DEFAULT_CACHE_DEEP;
      this.infos = {};
      this.nbEntries = 0;
      
    };
    
    NgWakEntityCache.prototype.setSize = function(size){
      if (size === null || size < DEFAULT_CACHE_SIZE){
        size = DEFAULT_CACHE_SIZE;
      }
      this.maxEntities = size;
    };
    
    NgWakEntityCache.prototype.setDeep = function(deep){
      this.deep = deep;
    };
    
    NgWakEntityCache.prototype.getCacheInfo = function(key){
      return this.infos[key] || null;
    };
    
    NgWakEntityCache.prototype.replaceCachedEntity = function(key, entity){
      var cachedEntity = this.getCacheInfo(key);
      if(cachedEntity !== null && entity.__STAMP > cachedEntity.__STAMP){
        //update reference @todo related entities
        cachedEntity = entity;
      }
    };
    
    /** end cache */
    
    /** directory */
    
    /**
     * Returns a promise :
     * - success : in param an object like {result : true} if ok - {result : false} if ko
     * - error : if the request had a problem
     * @param {string} login
     * @param {string} password
     * @returns {deferred.promise}
     */
    var directoryLoginByPassword = function(login, password){
      var deferred, wakOptions = {};
      //prepare the promise
      deferred = $q.defer();
      
      wakOptions.onSuccess = function(event){
          deferred.resolve({result : event.result});
      };
      wakOptions.onError = function(event){
        deferred.reject(event);
      };
      
      WAF.directory.loginByPassword(login,password,wakOptions);
      
      return deferred.promise;
    };
    
    
    /**
     * Returns a promise :
     * - success : in param an object like {result : currentUserInfos} if ok
     * - error : if the request had a problem
     * @returns {deferred.promise}
     */
    var directoryCurrentUser = function(){
      var deferred, wakOptions = {};
      //prepare the promise
      deferred = $q.defer();
      
      wakOptions.onSuccess = function(event){
        deferred.resolve({result : event.result});
      };
      wakOptions.onError = function(event){
        deferred.reject(event);
      };
      
      WAF.directory.currentUser(wakOptions);
      
      return deferred.promise;
    };
    
    
    
    /**
     * Returns a promise :
     * - success : in param an object like {result : true} if ok - {result : false} if ko
     * - error : if the request had a problem
     * @returns {deferred.promise}
     */
    var directoryLogout = function(){
      var deferred, wakOptions = {};
      //prepare the promise
      deferred = $q.defer();
      
      wakOptions.onSuccess = function(event){
        deferred.resolve({result : event.result});
      };
      wakOptions.onError = function(event){
        console.error('>logout',event);
        deferred.reject(event);
      };
      
      WAF.directory.logout(wakOptions);
      
      return deferred.promise;
    };
    
    
    /**
     * Returns a promise :
     * - success : in param an object like {result : true} if ok - {result : false} if ko
     * - error : if the request had a problem
     * @param {String} groupName
     * @returns {deferred.promise}
     */
    var directoryCurrentUserBelongsTo = function(groupName){
      var deferred, wakOptions = {};
      //prepare the promise
      deferred = $q.defer();
      
      wakOptions.onSuccess = function(event){
        deferred.resolve({result : event.result});
      };
      wakOptions.onError = function(event){
        deferred.reject(event);
      };
      
      WAF.directory.currentUserBelongsTo(groupName,wakOptions);
      
      return deferred.promise;
    };

    /** returned object */
    
    var $wakandaResult = {
      init: init,
      getDatastore: getDatastore,
      $login : directoryLoginByPassword,
      $loginByPassword : directoryLoginByPassword,
      $currentUser : directoryCurrentUser,
      $logout : directoryLogout,
      $currentUserBelongsTo : directoryCurrentUserBelongsTo
    };
    
    Object.defineProperty($wakandaResult,'$ds',{
      get:getDatastore
    });
    
    return $wakandaResult;

  }]);