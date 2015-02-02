describe("firstDraft test - data manipulation",function(){
  
  var dbStateHelper = require('./helpers/directives/dbStateHelper');
  var e2eHelpers = require('./helpers/e2eHelpers');
  var urlToTest = '/#/e2e-tests/first-draft';
  
  describe("> "+urlToTest,function(){
    
    //those are helpers for this specific page
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
    
    beforeEach(function(){
      if(browser.getCurrentUrl().then(function(url){
        if(url.indexOf(urlToTest) === -1){
          console.log('Jump to '+urlToTest);
          browser.get(urlToTest);
        }
      }));
    });
  
    describe("> check we are on the correct page", function(){

      it("> should have a title",function(){
        expect(browser.getTitle()).toBe("angular-wakanda-front");
      });

      it("> should have an h3 tag",function(){
        var h3 = element(by.css('.view-e2e-tests-first-draft > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - First draft");
        });
      });

    });

    describe("> reset db", function(){

      dbStateHelper.launch(['init']);
      
      it("> employees list should be loaded and have 10 entries",function(){
        var list = element.all(by.css('.employees-list li'));
        expect(list.count()).toBe(10);
      });
      
      it("> check first and last employee of the first raw page",function(){
        browser.findElements(by.repeater("employee in employees")).then(function(employees){
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
      
      describe("> click on the first employee - and modify it", function(){
        
        beforeEach(function(){
          
          element.all(by.repeater("employee in employees")).first().element(by.css('.edit-employee')).click();
          browser.driver.sleep(10);
          browser.waitForAngular();
          element(by.model("currentEmployee.firstName")).sendKeys('toto');
          element(by.model("currentEmployee.lastName")).sendKeys('toto');
          element(by.id("save-employee")).click();
          browser.driver.sleep(10);
          browser.waitForAngular();
          
        });
        
        describe('> reload the page (to check persistance)',function(){
          
          beforeEach(function(){
            
            browser.get(urlToTest);
            
          });

          it('> modifications should have been takien in account',function(){
            
            element.all(by.repeater("employee in employees")).first().element(by.css('.first-name')).getText().then(function(value){
              expect(value).toBe('HARRYtoto');
            });
            element.all(by.repeater("employee in employees")).first().element(by.css('.last-name')).getText().then(function(value){
              expect(value).toBe('LUHEJItoto');
            });
            
          });

        });
        
      });

    });
  
  });
  
});