(function(){
'use strict';

    var wakConnectorModule = angular.module('wakConnectorModule',[]);
    
    wakConnectorModule.factory('wakConnectorService',['$q',function($q){
        
        var ds = null;
        
        var init = function(catalog){
            console.log('>wakConnectorService init');
            var deferred = $q.defer();
            if(typeof catalog !== "string" || catalog === '*' || catalog === ''){
                catalog = null;
            }
            if(ds === null){
                new WAF.DataStore({
                    onSuccess: function(event){
                        ds = event.dataStore;
                        console.log('>wakConnectorService init > success',event);
                        deferred.resolve(ds);
                    },
                    onError: function(event){
                        ds = null;
                        console.error('>wakConnectorService init > error',event);
                        deferred.reject(event);
                    },
                    catalog: catalog
                });
            }
            else{
                deferred.resolve(ds);
            }
            return deferred.promise;
        };
        
        var getDatastore = function(){
            if(ds !== null){
                return ds;
            }
            else{
                throw new Error("The Datastore isn't initialized please execute .init(catalog) before you run your app.");
            }
        };

        return {
            init  : init,
            getDatastore   : getDatastore
        };

    }]);

})();