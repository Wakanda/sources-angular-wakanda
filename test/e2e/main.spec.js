describe("e2e-test main",function(){
  
  var ptor = protractor.getInstance();
    
  //get to the main page
  ptor.get('/#/e2e-tests/main');
  
  describe("check we are on the correct page", function(){
    
    it("shoud have a title",function(){
      expect(ptor.getTitle()).toBe("angular-wakanda-front");
    });
    
    it("shoud have an h3 tag",function(){
      var h3 = ptor.findElement(by.css('#view-e2e-tests-main h3'));
      expect(h3.getText()).toBe("E2E Tests - Main");
    });
    
  });
  
  describe("check the database", function(){
    
    it("1) flushing the db",function(){
      element(by.id("db-state-action-flush-db")).click().then(function(){
        var countCompanies = element(by.id("count-companies"));
        countCompanies.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countEmployees = element(by.id("count-employees"));
        countEmployees.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countProducts = element(by.id("count-products"));
        countProducts.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
      });
    });
    
    it("2) state the db",function(){
      element(by.id("db-state-action-refresh-state")).click().then(function(){
        var countCompanies = element(by.id("count-companies"));
        countCompanies.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countEmployees = element(by.id("count-employees"));
        countEmployees.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countProducts = element(by.id("count-products"));
        countProducts.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
      });
    });
    
    it("3) reset the db",function(){
      element(by.id("db-state-action-init-db")).click().then(function(){
        var countCompanies = element(by.id("count-companies"));
        countCompanies.getText().then(function(text){
          expect(parseInt(text)).toEqual(62);
        });
        var countEmployees = element(by.id("count-employees"));
        countEmployees.getText().then(function(text){
          expect(parseInt(text)).toEqual(1000);
        });
        var countProducts = element(by.id("count-products"));
        countProducts.getText().then(function(text){
          expect(parseInt(text)).toEqual(24);
        });
      });
    });
    
    it("4) state the db",function(){
      element(by.id("db-state-action-refresh-state")).click().then(function(){
        var countCompanies = element(by.id("count-companies"));
        countCompanies.getText().then(function(text){
          expect(parseInt(text)).toEqual(62);
        });
        var countEmployees = element(by.id("count-employees"));
        countEmployees.getText().then(function(text){
          expect(parseInt(text)).toEqual(1000);
        });
        var countProducts = element(by.id("count-products"));
        countProducts.getText().then(function(text){
          expect(parseInt(text)).toEqual(24);
        });
      });
    });
    
    it("5) flushing the db",function(){
      element(by.id("db-state-action-flush-db")).click().then(function(){
        var countCompanies = element(by.id("count-companies"));
        countCompanies.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countEmployees = element(by.id("count-employees"));
        countEmployees.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countProducts = element(by.id("count-products"));
        countProducts.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
      });
    });
    
    it("6) state the db",function(){
      element(by.id("db-state-action-refresh-state")).click().then(function(){
        var countCompanies = element(by.id("count-companies"));
        countCompanies.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countEmployees = element(by.id("count-employees"));
        countEmployees.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
        var countProducts = element(by.id("count-products"));
        countProducts.getText().then(function(text){
          expect(parseInt(text)).toEqual(0);
        });
      });
    });
    
  });
  
});