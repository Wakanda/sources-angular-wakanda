/**
 * This module is meant to ease the testing/e2e connection of the directoryState directive
 */
module.exports = {
  
  launch : function(list, start){
    
    var ptor = protractor.getInstance();
    
    start = typeof start === 'undefined' ? 0 : start;
    
    //checking for unallowed methods
    var METHODS_ALLOWED = ['current-user','logout'];
    if(list.length === 0){
      console.warn("No methods specified to test in test/e2e/helpers/directives/directoryStateHelper");
      return false;
    }
    for(var i=0; i<list.length; i++){
      if(METHODS_ALLOWED.indexOf(list[i]) === -1){
        console.warn(list[i] + " method not allowed in test/e2e/helpers/directives/directoryStateHelper");
        return false;
      }
    }
    
    beforeEach(function(){
      //display if not displayed
      ptor.findElement(by.css('h3#directory-state-title+div')).then(function(div){
        div.isDisplayed().then(function(displayed){
          if(displayed === false){
            element(by.id('directory-state-title')).click();
          }
        });
      });
    });
    
    for(var i=0; i<list.length; i++){
      if(list[i] === 'current-user'){
        (function(number){
          it("> "+(start+number)+") current-user",function(){
            element(by.css("#directory-state-body .current-user")).click().then(function(){
              element(by.css(".current-logged-in-user")).getText().then(function(text){
                expect(JSON.parse(text).result).toBeDefined();
              });
            });
          });
        })(i+1);
      }
      else if(list[i] === 'logout'){
        (function(number){
          it("> "+(start+number)+") logout",function(){
            element(by.css("#directory-state-body .logout")).click().then(function(){
              element(by.css(".current-logged-in-user")).getText().then(function(text){
                expect(JSON.parse(text).result).toBeNull();
              });
            });
          });
        })(i+1);
      }
    }
    return list.length;
      
  }
  
};