/**
 * This is a draft for accesing Wakanda DB resources
 * Note that it needs extra Wakanda JS script, which are not referenced as dependencies (but yet are included in the index.html)
 */
(function(){
'use strict';

    var wakandaConnect1Module = angular.module('wakandaConnect1Module',[]);
    
    wakandaConnect1Module.provider('wakandaConnect1Service',function(){
        
        this.ds = null;
        
        this.$get = [function(){
                
            var thatModule = {};
            
            var initDs = function(options){
                console.log('>wakandaConnect1Service initDs');
                if(typeof options === "undefined"){
                    options = {};
                }
                if(options.catalog === '*' || options.catalog === ''){
                    options.catalog = null;
                }
                //todo handle success and error callbacks in options
                thatModule.ds = new WAF.DataStore({
                    onSuccess: function(event){
                        thatModule.ds = event.dataStore;
                        if(typeof options.success === "function"){
                            options.success(thatModule.ds);
                        }
                        console.log('>wakandaConnect1Service initDs > success',event);
                    },
                    onError: function(event){
                        thatModule.ds = null;
                        if(typeof options.error === "function"){
                            options.error(event);
                        }
                        console.error('>wakandaConnect1Service initDs > error',event);
                    },
                    catalog: options.catalog
                });
                return thatModule.ds;
            };
            
            //@warn asynchronous vs synchronous problem - this should be treated as async
            
            var getDs = function(options){
                console.log('>wakandaConnect1Service getDs');
                if(thatModule.ds && !(options && options.forceReload === true)){
                    return thatModule.ds;
                }
                else{
                    initDs(options);
                    return thatModule.ds;
                }
            };
            
            return {
                
                getDs   : getDs
                
            };
            
        }];
        
    });
    
})();