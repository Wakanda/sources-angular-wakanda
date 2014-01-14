/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
/**
 * @module Utils
 **/


/**
 * The Debug module is part of the Core and Utils composite modules and implements various functions for debugging purposes.
 *  
 * @class			WAF.utils.debug
 */
WAF.utils.debug = {

    /**
     * console
     *
     * @class			WAF.utils.debug.console
     */
	console		: {
        
        /**
         * log the message to the console of the browser is the debugMode is set to true
         *
         * @static
         * @method log
         * @param {String} string
         **/
		log: function(string){
			if (WAF.config.debugMode) {
				if (typeof console  != "undefined") {
					if (console.log) {
						console.log(string);
					}
				}
			}
		},
        
        /**
         * show the object in the console of the browser is the debugMode is set to true
         *
         * @static
         * @method dir
         * @param {String} object
         **/
		dir: function(object){
			if (WAF.config.debugMode) {
				if (typeof console != "undefined") {
					if (console.dir) {
						console.dir(object);
					}
				}
			}
		}
	}
};