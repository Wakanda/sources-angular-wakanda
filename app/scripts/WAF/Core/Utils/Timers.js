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
//// "use strict";

/**
 * @module Utils
 */

/**
 * The Timers module is part of the Core and Utils composite
 * modules and implements 2 functions to time code execution.
 *
 * @class WAF.utils.timer
 */

// Old global "private" container for timers
WAF._private.globals.timers = [];

(function (timers) {

    /**
     * This private variable stores starting date of each timers
     *
     * @private
     * @property timers
     * @type Array
     */
    timers = timers || [];

    WAF.utils.timer = {

        /**
         * Start a timer identified by an id parameter
         * 
         * @static
         * @method start
         * @param {String|Number} id Required.
         */
        start : function (id) {
            if (timers[id] !== undefined) {
                timers[id].start = new Date().getTime();
            } else {
                timers[id] = {
                    start   : new Date().getTime(),
                    duration: null
                };
            }
        },

        /**
         * Get the time spent since a timer was started with this id
         * 
         * @static
         * @method getValue
         * @param {String|Number} id Required.
         * @return {Number|Null}
         */
        getValue : function (id) {
            if (timers[id] !== undefined) {
                return new Date().getTime() - timers[id].start;
            } else {
                return null;
            }
        }
    };

}(WAF._private.globals.timers));