module.exports = {
  
  filters : {
    
    /**
     * Very simple filter to reverse the currency filter
     * @param {string} value
     * @returns {number}
     */
    unCurrency : function(value){
      return parseInt(value.replace(/\,/g,'').replace('$',''));
    }
    
  }
  
};