angular.module('unitTestsHelpersModule', [])
  .service('unitTestsHelpers', ['$http', function ($http){
'use strict';

    /**
     * 
     * @param {string} url
     * @param {boolean} [async=true] @optional
     * @param {Array} [statusCodesOk=[200]] @optional if some specific status code should be accepted not like an error in some case (like the 401 in logout, just specify it here)
     * @returns {mixed}
     */
    var request = function(url,async, statusCodesOk){
      async = typeof async === 'undefined' ? true : async;
      if(async === true){
        return $http.get(url);
      }
      else{
        var httpRequest = new XMLHttpRequest();
        if(typeof statusCodesOk !== 'undefined'){
          if(statusCodesOk instanceof Array === false){
            throw new Error("statusCodesOk must be an array of number http status codes");
          }
          else{
            statusCodesOk.push(200);
          }
        }
        else{
          statusCodesOk = [200];
        }
        httpRequest.open('GET', url, false);
        httpRequest.send();
        if(statusCodesOk.indexOf(httpRequest.status) === -1){
          return {
            error : true
          };
        }
        else{
          return JSON.parse(httpRequest.responseText);
        }
      }
    };

    return {
      db : {
        flush : function(async){
          return request('/unit-tests/db/flush',async);
        },
        fill : function(async){
          return request('/unit-tests/db/fill',async);
        },
        reset: function(async){
          return request('/unit-tests/db/reset',async);
        },
        state: function(async){
          return request('/unit-tests/db/state',async);
        }
      },
      directory : {
        currentUser : function(async){
          return request('/rest/$directory/currentUser',async);
        },
        logout : function(async){
          return request('/rest/$directory/logout',async,[401]);
        }
      }
    };
    
  }]);
