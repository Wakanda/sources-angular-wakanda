(function(){
'use strict';

    var wakConnectorModule = angular.module('wakConnectorModule',[]);
    
    wakConnectorModule.provider('wakConnectorService',function(){
        
        this.$get = ['$q',function($q){
            
            var wait = function(duration, forceFail){
                var deferred = $q.defer();
                if(forceFail){
                    setTimeout(function(){
                        deferred.reject("deferred reject after "+duration+"ms");
                    },duration);
                }
                else{
                    setTimeout(function(){
                        deferred.resolve("deferred resolved after "+duration+"ms");
                    },duration);
                }
                return deferred.promise;
            };
            
            return {
                wait    : wait
            };
            
        }];
        
    });

})();