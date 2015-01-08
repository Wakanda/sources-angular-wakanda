describe("directoryStandAlone test", function(){
  
  var directoryStateHelper = require('./helpers/directives/directoryStateHelper');
  var urlToTest = '/#/e2e-tests/directory-stand-alone';
  
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

      it("> should have a title",function(){
        expect(browser.getTitle()).toBe("angular-wakanda-front");
      });

      it("> should have an h3 tag",function(){
        var h3 = element(by.css('.view-e2e-tests-directory-stand-alone > h3'));
        h3.getText().then(function(text){
          expect(text).toBe("E2E Tests - Directory (Stand Alone)");
        });
      });
      
      directoryStateHelper.launch(['logout']);
      
      describe("> try login LUHEJI, HARRY (correct user) (still problem when checking all tests)", function(){
        
        it("> should successfully login LUHEJI, HARRY",function(){
        
          browser.findElements(by.repeater("employee in employees")).then(function(employees){
            employees[0].click().then(function(){
              expect(browser.findElement(by.css(".logged-in")).isDisplayed()).toBe(true);
              expect(browser.findElement(by.css(".logged-in-error")).isDisplayed()).toBe(false);
              expect(browser.findElement(by.css(".logged-in .last-name")).getText()).toBe('LUHEJI');
              expect(browser.findElement(by.css(".logged-in .first-name")).getText()).toBe('HARRY');
//              browser.findElement(by.css(".logged-in-error")).getText().then(function(text){
//                console.log('logged-in-error',text);
//              });
            });
          });
        
        });
        
        it("> then it should sucessfully retrieve the current user",function(){
          
          browser.findElement(by.css(".current-user")).click().then(function(){
            browser.findElement(by.css(".current-logged-in-user")).getText().then(function(text){
              var userInfos = JSON.parse(text);
              expect(userInfos.result).toBeDefined();
              expect(userInfos.result.userName).toBe('LUHEJI');
              expect(userInfos.result.fullName).toBeDefined();
              expect(userInfos.result.ID).toBeDefined();
            });
          });
          
        });
        
        it("> finally check whose groups the user belongs to",function(){
          
          browser.findElement(by.css(".belongs-to-admin")).click().then(function(){
            browser.findElement(by.css(".belongs-to-admin .result-belongs-to")).getText().then(function(text){
              expect(text).toBe("false");
            });
          });
          
          browser.findElement(by.css(".belongs-to-employee")).click().then(function(){
            browser.findElement(by.css(".belongs-to-employee .result-belongs-to")).getText().then(function(text){
              expect(text).toBe("true");
            });
          });
          
          browser.findElement(by.css(".belongs-to-foo")).click().then(function(){
            browser.findElement(by.css(".belongs-to-foo .result-belongs-to")).getText().then(function(text){
              expect(text).toBe("false");
            });
          });
          
        });
        
      });
      
      describe("> try login KENOBI, OBI WAN (wrong user)", function(){
        
        it("> shouldn't login",function(){
        
          browser.findElements(by.repeater("employee in employees")).then(function(employees){
            employees[2].click().then(function(){
              expect(browser.findElement(by.css(".logged-in")).isDisplayed()).toBe(false);
              expect(browser.findElement(by.css(".logged-in-error")).isDisplayed()).toBe(true);
//              browser.findElement(by.css(".logged-in-error")).getText().then(function(text){
//                console.log('logged-in-error',text);
//              });
            });
          });
        
        });
        
      });

    });
    
  });
  
});