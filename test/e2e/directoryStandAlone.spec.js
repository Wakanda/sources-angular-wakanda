describe("directoryStandAlone test", function(){
  
  var ptor = protractor.getInstance();
  var directoryStateHelper = require('./helpers/directives/directoryStateHelper');
  var e2eHelpers = require('./helpers/e2eHelpers');
  var urlToTest = '/#/e2e-tests/directory-stand-alone';
  
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

      it("> should have a title",function(){
        expect(ptor.getTitle()).toBe("angular-wakanda-front");
      });

      it("> should have an h3 tag",function(){
        var h3 = element(by.css('.view-e2e-tests-directory-stand-alone > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - Directory (Stand Alone)");
        });
      });
      
      describe("> try login LUHEJI, HARRY (correct user)", function(){
        
      });
      
      describe("> try login KENOBI, OBI WAN (wrong user)", function(){
        
      });

    });
    
  });
  
});