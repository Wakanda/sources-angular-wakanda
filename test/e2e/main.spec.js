describe("e2e-test main",function(){
  
  var ptor = protractor.getInstance();
  var dbStateHelper = require('./directives/dbStateHelper');
    
  //get to the main page
  ptor.get('/#/e2e-tests/main');
  
  describe("check we are on the correct page", function(){
    
    it("shoud have a title",function(){
      expect(ptor.getTitle()).toBe("angular-wakanda-front");
    });
    
    it("shoud have an h3 tag",function(){
      var h3 = element(by.css('#view-e2e-tests-main > h3'));
      h3.getText().then(function(text){
        expect(text).toBe("E2E Tests - Main");
      });
    });
    
  });
  
  describe("check the database connection", function(){
    
    var start = dbStateHelper.launch([
      'flush',
      'refresh-empty',
      'init',
      'refresh-full',
      'flush',
      'refresh-empty'
    ]);
    
  });
  
});