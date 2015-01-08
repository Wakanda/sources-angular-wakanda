/**
 * This test purpose is to test the dbState directive.
 * It's not meant to be executed at every test run since the code tested
 * only relies on :
 * - the directive (which relies on plain REST calls)
 * - the directive test helper
 *
 * Such code won't change like the connector will
 */
describe("dbState directive",function(){
  
  var dbStateHelper = require('./helpers/directives/dbStateHelper');
  var urlToTest = '/#/e2e-tests/db-state';
  
  describe("> "+urlToTest,function(){
    
    beforeEach(function(){
      if(browser.getCurrentUrl().then(function(url){
        if(url.indexOf(urlToTest) === -1){
          console.log('Jump to '+urlToTest);
          browser.get(urlToTest);
        }
      }));
    });

    describe("> check we are on the correct page", function(){

      it("> shoud have a title",function(){
        expect(browser.getTitle()).toBe("angular-wakanda-front");
      });

      it("> shoud have an h3 tag",function(){
        var h3 = element(by.css('.view-e2e-tests-db-state > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - DB State");
        });
      });

    });

    describe("> check the database connection", function(){

      var tasks = [
        'flush',
        'refresh-empty',
        'init',
        'refresh-full',
        'flush',
        'refresh-empty'
      ];

      dbStateHelper.launch(tasks);

      it("> check the callbacks where called", function(){
        var divCallbackCalled = element(by.id('callback-called'));
        divCallbackCalled.getText().then(function(text){
          expect(parseInt(text)).toBe(3);//only calls callbacks on flush and init
        });
      });

    });
    
  });
  
});