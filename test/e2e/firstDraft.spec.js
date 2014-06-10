describe("firstDraft test",function(){
  
  var ptor = protractor.getInstance();
  var dbStateHelper = require('./directives/dbStateHelper');
  var urlToTest = '/#/e2e-tests/first-draft';
  
  describe("> "+urlToTest,function(){
    
    beforeEach(function(){
      if(browser.getCurrentUrl().then(function(url){
        if(url.indexOf(urlToTest) === -1){
          console.log('Jump to '+urlToTest);
          ptor.get(urlToTest);
        }
      }));
    });
  
    describe("check we are on the correct page", function(){

      it("shoud have a title",function(){
        expect(ptor.getTitle()).toBe("angular-wakanda-front");
      });

      it("shoud have an h3 tag",function(){
        var h3 = element(by.css('#view-e2e-tests-first-draft > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - First draft");
        });
      });

    });

    describe("reset db", function(){
    
      ptor.get('/#/e2e-tests/first-draft');

      dbStateHelper.launch(['init']);

    });
  
  });
  
});