describe("e2e-test main",function(){
  
  var ptor = protractor.getInstance();
  var dbStateHelper = require('./directives/dbStateHelper');
    
  //get to the main page
  ptor.get('/#/e2e-tests/db-state');
  
  describe("check we are on the correct page", function(){
    
    it("shoud have a title",function(){
      expect(ptor.getTitle()).toBe("angular-wakanda-front");
    });
    
    it("shoud have an h3 tag",function(){
      var h3 = element(by.css('#view-e2e-tests-db-state > h3'));
      h3.getText().then(function(text){
        expect(text).toBe("E2E Tests - DB State");
      });
    });
    
  });
  
  describe("check the database connection", function(){
    
    var tasks = [
      'flush',
      'refresh-empty',
      'init',
      'refresh-full',
      'flush',
      'refresh-empty'
    ];
    
    var start = dbStateHelper.launch(tasks);
    
    it("check the callbacks where called", function(){
      var divCallbackCalled = element(by.id('callback-called'));
      divCallbackCalled.getText().then(function(text){
        expect(parseInt(text)).toBe(tasks.length+1);
      });
    });
    
  });
  
});