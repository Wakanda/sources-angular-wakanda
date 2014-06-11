describe("firstDraft test",function(){
  
  var ptor = protractor.getInstance();
  var dbStateHelper = require('./directives/dbStateHelper');
  var e2eHelpers = require('./e2eHelpers');
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
  
    describe("> check we are on the correct page", function(){

      it("> shoud have a title",function(){
        expect(ptor.getTitle()).toBe("angular-wakanda-front");
      });

      it("> shoud have an h3 tag",function(){
        var h3 = element(by.css('#view-e2e-tests-first-draft > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - First draft");
        });
      });

    });

    describe("> reset db", function(){
    
      ptor.get('/#/e2e-tests/first-draft');

      dbStateHelper.launch(['init']);
      
      it("> employees list should be loaded and have 10 entries",function(){
        var list = element.all(by.css('.employees-list li'));
        expect(list.count()).toBe(10);
      });
      
      it("> check first and last employee of the first raw page",function(){
        ptor.findElements(by.repeater("employee in employees")).then(function(employees){
          function getLastName(el){
            return el.findElement(by.className('last-name')).getText();
          }
          function getFirstName(el){
            return el.findElement(by.className('first-name')).getText();
          }
          function getSalary(el){
            return el.findElement(by.className('salary')).getText();
          }
          function getEmployer(el){
            return el.findElement(by.className('employer-name')).getText();
          }
          //test first line
          expect(getFirstName(employees[0])).toBe('HARRY');
          expect(getLastName(employees[0])).toBe('LUHEJI');
          getSalary(employees[0]).then(function(salary){
            expect(e2eHelpers.filters.unCurrency(salary)).toBe(132765);
          });
          expect(getEmployer(employees[0])).toBe('Bag While Engineering');
          //test last line
          expect(getFirstName(employees[9])).toBe('CHARMAINE');
          expect(getLastName(employees[9])).toBe('TROPETHO');
          getSalary(employees[9]).then(function(salary){
            expect(e2eHelpers.filters.unCurrency(salary)).toBe(82507);
          });
          expect(getEmployer(employees[9])).toBe('Earth Sable Andloging');
        });
      });

    });
  
  });
  
});