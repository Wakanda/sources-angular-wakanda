/**
 * This module is meant to ease the testing/e2e connection of the dbState directive
 */
module.exports = {
  /**
   * 
   * @param {Array} list Ask for the tasks you want to test (see in the METHODS_ALLOWED)
   * @param {number} start 
   * @returns {number} Returns the index of the last test launched with this method
   * So that you could pass it in start to better identify failing tests when you use launch several times
   */
  launch : function(list,start){
    
    start = typeof start === 'undefined' ? 0 : start;
    
    //checking for unallowed methods
    var METHODS_ALLOWED = ['refresh-full','refresh-empty','init','flush'];
    if(list.length === 0){
      console.warn("No methods specified to test in test/e2e/unitTestHelpers");
      return false;
    }
    for(var i=0; i<list.length; i++){
      if(METHODS_ALLOWED.indexOf(list[i]) === -1){
        console.warn(list[i] + " method not allowed in test/e2e/unitTestHelpers");
        return false;
      }
    }
    
    for(var i=0; i<list.length; i++){
      if(list[i] === 'flush'){
        (function(number){
          console.log('number',number);
          it((start+number)+") flush db",function(){
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
        })(i+1);
      }
      else if(list[i] === 'refresh-empty'){
        (function(number){
          it((start+number)+") state db (empty)",function(){
            element(by.id("db-state-action-refresh-state-db")).click().then(function(){
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
        })(i+1);        
      }
      else if(list[i] === 'refresh-full'){
        (function(number){
          it((start+number)+") state db (full)",function(){
            element(by.id("db-state-action-refresh-state-db")).click().then(function(){
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
        })(i+1);   
      }
      else if(list[i] === 'init'){
        (function(number){
          it((start+number)+") init db",function(){
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
        })(i+1);
      }
    }
    return list.length;
  }
};