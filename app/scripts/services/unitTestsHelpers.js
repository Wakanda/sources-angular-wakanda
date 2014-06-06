angular.module('unitTestsHelpersModule', [])
  .service('unitTestsHelpers', ['$http', function ($http){
'use strict';

    var request = function(url,async){
      async = typeof async === 'undefined' ? true : async;
      if(async === true){
        return $http.get(url);
      }
      else{
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url, false);
        httpRequest.send();
        if(httpRequest.status !== 200){
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
      }
    };
    
  }]);
