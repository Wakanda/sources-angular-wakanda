/**
 * This test purpose is to test the directoryState directive.
 * It's not meant to be executed at every test run since the code tested
 * only relies on :
 * - the directive (which relies on plain REST calls)
 * - the directive test helper
 *
 * Such code won't change like the connector will
 */
describe("directoryState directive", function(){
  
  var ptor = protractor.getInstance();
  var directoryStateHelper = require('./helpers/directives/directoryStateHelper');
  var urlToTest = '/#/e2e-tests/directory-state';
  
  describe("> "+urlToTest,function(){
    
    beforeEach(function(){
      if(browser.getCurrentUrl().then(function(url){
        if(url.indexOf(urlToTest) === -1){
          console.log('Jump to '+urlToTest);
          ptor.get(urlToTest);
        }
      }));
    });

    describe("> check we are on the correct page", function(){

      it("> shoud have a title",function(){
        expect(ptor.getTitle()).toBe("angular-wakanda-front");
      });

      it("> shoud have an h3 tag",function(){
        var h3 = element(by.css('.view-e2e-tests-db-state > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - Directory State");
        });
      });

    });
    
    describe("> check the directory connection", function(){

      var tasks = [
        'logout',
        'current-user'
      ];

      directoryStateHelper.launch(tasks);

      it("> check the callbacks where called", function(){
        var divCallbackCalled = element(by.id('callback-called'));
        divCallbackCalled.getText().then(function(text){
          expect(parseInt(text)).toBe(1);//only calls callbacks on logout
        });
      });
      
    });
    
  });
  
});