describe("firstDraft test",function(){
  
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

      it('> check fetching relatedEntities company.staff', function() {
        var employes = element.all(by.css('.employees-list li'));
        var staffs = element.all(by.css('.staff-list li'));

        employes.first().element(by.css('[ng-click="selectCompany(employee.employer)"]')).click().then(function() {

          expect(staffs.count()).toBe(0);

          browser.findElement(by.css('[ng-click="company.staff.$fetch({pageSize:5})"]')).click().then(function() {

            expect(staffs.count()).toBe(1);
            expect(staffs.first().element(by.css('.last-name')).getText() === 'LUHEJI');
          });
        });

        employes.get(1).element(by.css('[ng-click="selectCompany(employee.employer)"]')).click().then(function() {

          expect(staffs.count()).toBe(0);

          browser.findElement(by.css('[ng-click="company.staff.$fetch({pageSize:5})"]')).click().then(function() {

            expect(staffs.count()).toBe(5);
            expect(staffs.first().element(by.css('.last-name')).getText() === 'VEGGGAR');
          });
        });
      });

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
      
      describe("> orderBy lastName asc",function(){
        
        it("employees should be correctly ordered", function(){
        
          browser.findElements(by.css("ul.ordering select option")).then(function(options){
            options.map(function(item){
              item.getText().then(function(text){
                if(text === "lastName asc"){
                  item.click().then(function(){
                    browser.findElements(by.repeater("employee in employees")).then(function(employees){
                      //test first line
                      expect(getFirstName(employees[0])).toBe('ARLEN');
                      expect(getLastName(employees[0])).toBe('AHLARS');
                      getSalary(employees[0]).then(function(salary){
                        expect(e2eHelpers.filters.unCurrency(salary)).toBe(33226);
                      });
                      expect(getEmployer(employees[0])).toBe('Network Rocket See');
                      //test last line
                      expect(getFirstName(employees[9])).toBe('CHARITY');
                      expect(getLastName(employees[9])).toBe('BADONE');
                      getSalary(employees[9]).then(function(salary){
                        expect(e2eHelpers.filters.unCurrency(salary)).toBe(29647);
                      });
                      expect(getEmployer(employees[9])).toBe('Earth Sable Andloging');
                    });
                  });
                }
              });
            });
          });
          
        });
        
        describe("> pagination on ordered collection",function(){
        
          it("should go to next page", function(){

            browser.findElement(by.css('[ng-click="employees.$nextPage()"]')).click().then(function(){

              browser.findElements(by.repeater("employee in employees")).then(function(employees){
                //test first line
                expect(getFirstName(employees[0])).toBe('JEWEL');
                expect(getLastName(employees[0])).toBe('BAGOSO');
                getSalary(employees[0]).then(function(salary){
                  expect(e2eHelpers.filters.unCurrency(salary)).toBe(134731);
                });
                expect(getEmployer(employees[0])).toBe('Month Business Plane');
                //test last line
                expect(getFirstName(employees[9])).toBe('AMADO');
                expect(getLastName(employees[9])).toBe('BARENE');
                getSalary(employees[9]).then(function(salary){
                  expect(e2eHelpers.filters.unCurrency(salary)).toBe(58185);
                });
                expect(getEmployer(employees[9])).toBe('Moon Developing Tree');
              });

            });

          });

          it("should go to previous page (first page)", function(){

            browser.findElement(by.css('[ng-click="employees.$prevPage()"]')).click().then(function(){

              browser.findElements(by.repeater("employee in employees")).then(function(employees){
                //test first line
                expect(getFirstName(employees[0])).toBe('ARLEN');
                expect(getLastName(employees[0])).toBe('AHLARS');
                getSalary(employees[0]).then(function(salary){
                  expect(e2eHelpers.filters.unCurrency(salary)).toBe(33226);
                });
                expect(getEmployer(employees[0])).toBe('Network Rocket See');
                //test last line
                expect(getFirstName(employees[9])).toBe('CHARITY');
                expect(getLastName(employees[9])).toBe('BADONE');
                getSalary(employees[9]).then(function(salary){
                  expect(e2eHelpers.filters.unCurrency(salary)).toBe(29647);
                });
                expect(getEmployer(employees[9])).toBe('Earth Sable Andloging');
              });

            });

          });
          
        });
        
        describe("> filtering on ordered collection", function(){
          
          var filterBy = "lastName=tr*";
          
          //TODO beforeAll or once
          beforeEach(function(){
            var input = browser.findElement(by.css(".filtering input[type=text]"));
            input.getAttribute('value').then(function(value){
              if(value !== filterBy){
                input.sendKeys(filterBy,protractor.Key.ENTER);
              }
            });
          });
          
          it("collection should contain 2 elements", function(){
            var list = element.all(by.css('.employees-list li'));
            expect(list.count()).toBe(2);
          });
          
          it("collection - check elements", function(){

            browser.findElements(by.repeater("employee in employees")).then(function(employees){
              //test first line
              expect(getFirstName(employees[0])).toBe('CHARMAINE');
              expect(getLastName(employees[0])).toBe('TROPETHO');
              getSalary(employees[0]).then(function(salary){
                expect(e2eHelpers.filters.unCurrency(salary)).toBe(82507);
              });
              expect(getEmployer(employees[0])).toBe('Earth Sable Andloging');
              //test last line
              expect(getFirstName(employees[1])).toBe('LUCIA');
              expect(getLastName(employees[1])).toBe('TRUCES');
              getSalary(employees[1]).then(function(salary){
                expect(e2eHelpers.filters.unCurrency(salary)).toBe(46310);
              });
              expect(getEmployer(employees[1])).toBe('Hand Year Papers');
            });

          });

        });

      });

    });

  });
});
