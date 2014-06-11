module.exports = {
  
  filters : {
    
    /**
     * Very simple filter to reverse the currency filter
     * @param {type} value
     * @returns {unresolved}
     */
    unCurrency : function(value){
      return parseInt(value.replace(/\,/g,'').replace('$',''));
    }
    
  }
  
};