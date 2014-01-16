(function(){
'use strict';

    var wakConnectorModule = angular.module('wakConnectorModule',[]);
    
    wakConnectorModule.factory('wakConnectorService',['$q',function($q){
        
        var time = null;
        
        var wait = function(duration, forceFail){
            console.log('called wait');
            var deferred = $q.defer();
            if(forceFail){
                setTimeout(function(){
                    time = (new Date()).getTime();
                    deferred.reject("deferred reject after "+duration+"ms at "+time);
                },duration);
            }
            else{
                setTimeout(function(){
                    time = (new Date()).getTime();
                    deferred.resolve("deferred resolved after "+duration+"ms at "+time);
                },duration);
            }
            return deferred.promise;
        };

        return {
            wait    : wait,
            getTime : function(){
                return time;
            }
        };

    }]);

})();