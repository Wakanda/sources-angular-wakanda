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


// NOTE: It would be nice if we could remove this obsolet detection


/**
 * User-agent environment
 *
 * @class WAF.utils.environment
 **/
WAF.utils.environment = {};

/**
 * User-agent environment detection
 *
 * @static
 * @method browserDetect
 **/
WAF.utils.environment.browserDetect = function(){
    var ua = navigator.userAgent;
    
    
    /**
     * User-agent environment
     *
     * @class WAF.utils.environment.browser
     **/
	WAF.utils.environment.browser = {};
    
    /**
     * Internet Explorer
     *
     * @static
     * @property ie
     * @type Boolean
     **/
    WAF.utils.environment.browser.ie = false;
    
    /**
     * Internet Explorer 6
     *
     * @static
     * @property ie6
     * @type Boolean
     **/
    WAF.utils.environment.browser.ie6 = false;
    
    /**
     * Internet Explorer 7
     *
     * @static
     * @property ie7
     * @type Boolean
     **/
    WAF.utils.environment.browser.ie7 = false;
    
    /**
     * Gecko
     *
     * @static
     * @property gecko
     * @type Boolean
     **/
    WAF.utils.environment.browser.gecko = false;
    
    /**
     * Safari
     *
     * @static
     * @property safari
     * @type Boolean
     **/
    WAF.utils.environment.browser.safari = false;
    
    /**
     * Safari 2
     *
     * @static
     * @property safari2
     * @type Boolean
     **/
    WAF.utils.environment.browser.safari2 = false;
    
    /**
     * Safari 3
     *
     * @static
     * @property safari3
     * @type Boolean
     **/
    WAF.utils.environment.browser.safari3 = false;
    
    /**
     * Firefox 3
     *
     * @static
     * @property firefox3
     * @type Boolean
     **/
    WAF.utils.environment.browser.firefox3 = false;
    
    if (ua.indexOf('Firefox/3') >= 0) {
		WAF.utils.environment.browser.firefox3 = true;
	}
	else {
		if (ua.indexOf("MSIE") >= 0) {
			WAF.utils.environment.browser.ie = true;
			if (ua.indexOf("MSIE 7") >= 0) {
				WAF.utils.environment.browser.ie7 = true;
			}
			if (ua.indexOf("MSIE 6") >= 0) {
				WAF.utils.environment.browser.ie6 = true;
			}
		}
		else {
			if (ua.indexOf("iPhone") >= 0) {
				WAF.utils.environment.browser.iphone = true;
				WAF.utils.environment.browser.safari = true;
			}
			else {
				if (ua.indexOf("WebKit") >= 0) {
					WAF.utils.environment.browser.safari = true;
					if (ua.indexOf("Version/3") >= 0) {
						WAF.utils.environment.browser.safari3 = true;
					}
					else {
						WAF.utils.environment.browser.safari2 = true;
					}
				}
				else {
					if (ua.indexOf("Gecko") >= 0) {
						WAF.utils.environment.browser.gecko = true;
					}
				}
			}
		}
	}
}

WAF.utils.environment.browserDetect();
