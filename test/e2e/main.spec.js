describe("e2e-test hello world",function(){
  
  var ptor = protractor.getInstance();
  
  describe("home", function(){
    
    //get to the main page
    ptor.get('/#/e2e-tests/main');
    
    it("shoud have a title",function(){
      expect(ptor.getTitle()).toBe("angular-wakanda-front");
    });
    
    it("shoud have an h3 tag",function(){
      var h3 = ptor.findElement(by.css('#view-e2e-tests-main h3'));
      expect(h3.getText()).toBe("E2E Tests - Main");
    });
    
  });
  
});