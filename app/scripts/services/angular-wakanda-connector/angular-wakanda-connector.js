(function(){
'use strict';

    var wakConnectorModule = angular.module('wakConnectorModule',[]);
    
    wakConnectorModule.factory('wakConnectorService',['$q',function($q){
        
        var ds = null;
        
        var initDs = function(catalog){
            console.log('>wakConnectorService initDs');
            var deferred = $q.defer();
            if(typeof catalog !== "string" || catalog === '*' || catalog === ''){
                catalog = null;
            }
            if(ds === null){
                new WAF.DataStore({
                    onSuccess: function(event){
                        ds = event.dataStore;
                        console.log('>wakConnectorService initDs > success',event);
                        deferred.resolve(ds);
                    },
                    onError: function(event){
                        ds = null;
                        console.error('>wakConnectorService initDs > error',event);
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
        
        var getDs = function(){
            if(ds !== null){
                return ds;
            }
            else{
                throw new Error("The Datastore isn't initialized please execute .initDs(catalog) before you run your app.");
            }
        };

        return {
            initDs  : initDs,
            getDs   : getDs
        };

    }]);

})();