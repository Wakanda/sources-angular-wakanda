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
 *  @module Utils
 */
 
 
 
 String.prototype.capitalize = function()
{
	if (this.length > 1)
	{
		return this[0].toUpperCase()+this.substring(1).toLowerCase();
	}
	else
		return this.toUpperCase();
}

String.prototype.capitalizeEachWord = function()
{
	var result = this.split(" ");	
        for (var i = 0, nbElems = result.length; i < nbElems; i++)
	{
		var elem = result[i];
		if ( (typeof elem == "string") || (elem instanceof String) )
			result[i] = elem.capitalize();
	}

	return result.join(" ");
}



/**
 * @class WAF.utils
 **/


WAF.utils.getBoolValue = function(text)
{
	if (text == null)
		return false;
	else
	{
		if (typeof text == 'string')
		{
			if (text.toLowerCase() == 'true')
				return true;
			else
				return false;
		}
		else
			return text;
	}
}

/**
 * getBrowserLang
 *
 * @static
 * @method getBrowserLang
 * @return {String}
 **/
WAF.utils.getBrowserLang = function()
{
	var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || 'us').substr(0, 2).toLowerCase();
	return lang;
};

WAF.utils.formatString = function(value, options)
{
	var result;
	if (options == null || value == null)
	{
		result = value;
	}
	else
	{
		if (typeof options === 'string')
			options = { format: options};
		switch (options.format)
		{
			case 'U':
				result = value.toUpperCase();
				break;
			case 'l':
				result = value.toLowerCase();
				break;
			case 'C':
				result = value.capitalize();
				break;
			case 'c':
				result = value.capitalizeEachWord();
				break;
				
			default:
                // Phonenumber like format. 
                // Use # as placeholder, other chars will be inserted as is... (ie: "(###) ###-###" )
				result = '';
                var j = 0;
                var format = options.format || '';
                for(var i = 0; i < format.length; i++)
                    result += format[i] == '#' ? (value[j++] || '') : format[i];
                result += value.slice(j);
		}
	}
	
	return result;
}

/**
 * formatDate
 *
 * @static
 * @method formatDate
 * @param {String} value
 * @param {Object} xoptions
 * @return {String}
 **/
WAF.utils.formatDate = function(value, xoptions)
{
	if (xoptions == null)
	{
		xoptions = { format: "" };
	}
	var options = { format: xoptions.format, locale: xoptions.locale };
	
	if (options.locale == null)
		options.locale = WAF.utils.getBrowserLang();
	
	var settings = null;
	if (options.locale != null)
	{
		if (options.locale == "us" || options.locale == "en")
			options.locale = '';
		settings = $.datepicker.regional[options.locale];
		if (settings != null) {
			if ((options.format == null || options.format == "") && settings.dateFormat != null)
				options.format = settings.dateFormat;
		}
	}

	if (options.format == null || options.format == "")
	{
		options.format = "mm/dd/yy";
	}
	
	return $.datepicker.formatDate(options.format, value, settings)
};


/**
 * formatNumber
 *
 * @static
 * @method formatNumber
 * @param {Number} value
 * @param {Object} xoptions
 * @return {String}
 **/
WAF.utils.formatNumber = function(value, xoptions)
{
	function FormatData(dec, group, neg)
	{
		this.dec = dec;
		this.group = group;
		this.neg = neg;
	};

	function formatCodes(locale)
	{
		var dec = ".";
		var group = ",";
		var neg = "-";

		if (locale == "us" ||
             locale == "ae" ||
             locale == "eg" ||
             locale == "il" ||
             locale == "jp" ||
             locale == "sk" ||
             locale == "th" ||
             locale == "cn" ||
             locale == "hk" ||
             locale == "tw" ||
             locale == "au" ||
             locale == "ca" ||
             locale == "gb" ||
             locale == "in"
            )
		{
			dec = ".";
			group = ",";
		}

		else if (locale == "de" ||
             locale == "vn" ||
             locale == "es" ||
             locale == "dk" ||
             locale == "at" ||
             locale == "gr" ||
             locale == "br"
            )
		{
			dec = ",";
			group = ".";
		}
		else if (locale == "cz" ||
              locale == "fr" ||
             locale == "fi" ||
             locale == "ru" ||
             locale == "se"
            )
		{
			group = " ";
			dec = ",";
		}
		else if (locale == "ch")
		{
			group = "'";
			dec = ".";
		}

		return new FormatData(dec, group, neg);
	};

	if (xoptions == null)
	{
		xoptions = { format: "" };
	}
	var options = { format: xoptions.format, locale: xoptions.locale };
	
	if (options.locale == null)
		options.locale = WAF.utils.getBrowserLang();

	var returnString = String(value);
	if (options.format == null || options.format == "")
		return returnString;
	else
	{
		var formatData = formatCodes(options.locale.toLowerCase());

		var dec = formatData.dec;
		var group = formatData.group;
		var neg = formatData.neg;

		var validFormat = "0#-,.";

		var prefix = "";
		var negativeInFront = false;
		for (var i = 0; i < options.format.length; i++)
		{
			if (validFormat.indexOf(options.format.charAt(i)) == -1)
				prefix = prefix + options.format.charAt(i);
			else if (i == 0 && options.format.charAt(i) == '-')
			{
				negativeInFront = true;
				continue;
			}
			else
				break;
		}
		var suffix = "";
		for (var i = options.format.length - 1; i >= 0; i--)
		{
			if (validFormat.indexOf(options.format.charAt(i)) == -1)
				suffix = options.format.charAt(i) + suffix;
			else
				break;
		}
		options.format = options.format.substring(prefix.length);
		options.format = options.format.substring(0, options.format.length - suffix.length);
		var number = value;

		if (suffix == "%")
			number = number * 100;

		var returnString = "";

		var decimalValue = number % 1;
		if (options.format.indexOf(".") > -1)
		{
			var decimalPortion = dec;
			var decimalFormat = options.format.substring(options.format.lastIndexOf(".") + 1);
			var decimalString = new String(decimalValue.toFixed(decimalFormat.length));
			decimalString = decimalString.substring(decimalString.lastIndexOf(".") + 1);
            
			for (var i = 0; i < decimalFormat.length; i++)
			{
				if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) != '0')
				{
					decimalPortion += decimalString.charAt(i);
					//don't know why there is a break here so..'
					//break;
				}
				else if (decimalFormat.charAt(i) == "0")
				{
					decimalPortion += decimalString.charAt(i);
				}
			}
			if (decimalPortion != dec)
				returnString += decimalPortion;
		}
		else
			number = Math.round(number);

		var ones = Math.floor(number);
		if (number < 0)
			ones = Math.ceil(number);

		var onePortion = "";
		if (ones == 0)
		{
			onePortion = "0";
			if (number < 0)
				onePortion = "-0";
		}
		else
		{
			var onesFormat = "";
			if (options.format.indexOf(".") == -1)
				onesFormat = options.format;
			else
				onesFormat = options.format.substring(0, options.format.indexOf("."));
			var oneText = new String(ones);
			var groupLength = 9999;
			if (onesFormat.lastIndexOf(",") != -1)
				groupLength = onesFormat.length - onesFormat.lastIndexOf(",") - 1;
			var groupCount = 0;
			for (var i = oneText.length - 1; i > -1; i--)
			{
				onePortion = oneText.charAt(i) + onePortion;

				groupCount++;

				if (groupCount == groupLength && i != 0 && oneText.charAt(i-1) !== '-')
				{
					onePortion = group + onePortion;
					groupCount = 0;
				}

			}
		}

		returnString = onePortion + returnString;

		if (number < 0 && negativeInFront && prefix.length > 0)
		{
			returnString = returnString.substring(1);
			prefix = neg + prefix;
		}

		returnString = prefix + returnString + suffix;

		return returnString;
	}
};


/**
 * String util
 *
 * @class WAF.utils.string
 **/
WAF.utils.string = {

	/**
	 * replace
	 * 
     * @static
     * @method replace
	 * @param {String} sString
	 * @param {String} sReplaceThis
	 * @param {String} sWithThis
	 * @return {String}
	 */
	replace : function (sString, sReplaceThis, sWithThis) {
		if ((sReplaceThis !== "") && (sReplaceThis !== sWithThis)) {
			var counter = 0;
			var start = 0;
			var before = "";
			var after = "";
			while (counter<sString.length) {
				start = sString.indexOf(sReplaceThis, counter);
				if (start == -1){
					break;
				} else {
					before = sString.substr(0, start);
					after = sString.substr(start + sReplaceThis.length, sString.length);
					sString = before + sWithThis + after;
					counter = before.length + sWithThis.length;
				}
			}
		}
		return sString;
	},

	/**
	 * htmlDecodes the specified string, replacing html entities &[amp|lt|gt|nbsp]; with corresponding characters
	 * 
     * @static
     * @method htmlDecode
	 * @param {String} value
	 * @return {String}
	 */
	htmlDecode: function(value){
		if (value && (value == '&nbsp;' || value=='&#160;' || (value.length == 1 && value.charCodeAt(0) == 160))){
			return ' ';
		}
		
		return !value ? value : String(value).replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
	}
};


WAF.utils.init = function(){
	var lang = WAF.utils.getBrowserLang();
	var dateOptions = null;
	if (typeof $ !== 'undefined' && $ != null && $.datepicker != null)
		dateOptions = $.datepicker.regional[lang];
	if (dateOptions != null)
	{
		$.datepicker.setDefaults(dateOptions);
		WAF.utils.dateInputFormat = dateOptions.dateFormat || "m/d/yy";
	}
	else
		WAF.utils.dateInputFormat = "m/d/yy";
}

// WARNING: HTMLEncode is created in the global scope


/*
HTMLEncode - Encode HTML special characters.
Copyright (c) 2006 Thomas Peri, http://www.tumuski.com/

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The Software shall be used for Good, not Evil.

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * HTML-Encode the supplied input
 * 
 * Parameters:
 *
 * (String)  source    The text to be encoded.
 * 
 * (boolean) display   The output is intended for display.
 *
 *                     If true:
 *                     * Tabs will be expanded to the number of spaces 
 *                       indicated by the 'tabs' argument.
 *                     * Line breaks will be converted to <br />.
 *
 *                     If false:
 *                     * Tabs and linebreaks get turned into &#____;
 *                       entities just like all other control characters.
 *
 * (integer) tabs      The number of spaces to expand tabs to.  (Ignored 
 *                     when the 'display' parameter evaluates to false.)
 *
 * v 0.3 - January 4, 2006
 */
function htmlEncode(source, display, tabs)
{
	function special(source)
	{
		var result = '';
		for (var i = 0; i < source.length; i++)
		{
			var c = source.charAt(i);
			if (c < ' ' || c > '~')
			{
				c = '&#' + c.charCodeAt() + ';';
			}
			result += c;
		}
		return result;
	}
	
	function format(source)
	{
		// Use only integer part of tabs, and default to 4
		tabs = (tabs >= 0) ? Math.floor(tabs) : 4;
		
		// split along line breaks
		var lines = source.split(/\r\n|\r|\n/);
		
		// expand tabs
		for (var i = 0; i < lines.length; i++)
		{
			var line = lines[i];
			var newLine = '';
			for (var p = 0; p < line.length; p++)
			{
				var c = line.charAt(p);
				if (c === '\t')
				{
					var spaces = tabs - (newLine.length % tabs);
					for (var s = 0; s < spaces; s++)
					{
						newLine += ' ';
					}
				}
				else
				{
					newLine += c;
				}
			}
			// If a line starts or ends with a space, it evaporates in html
			// unless it's an nbsp.
			newLine = newLine.replace(/(^ )|( $)/g, '&nbsp;');
			lines[i] = newLine;
		}
		
		// re-join lines
		var result = lines.join('<br />');
		
		// break up contiguous blocks of spaces with non-breaking spaces
		result = result.replace(/  /g, ' &nbsp;');
		
		// tada!
		return result;
	}

	var result = source;
	
	// ampersands (&)
	result = result.replace(/\&/g,'&amp;');

	// less-thans (<)
	result = result.replace(/\</g,'&lt;');

	// greater-thans (>)
	result = result.replace(/\>/g,'&gt;');
	
	if (display)
	{
		// format for display
		result = format(result);
	}
	else
	{
		// Replace quotes if it isn't for display,
		// since it's probably going in an html attribute.
		result = result.replace(new RegExp('"','g'), '&quot;');
	}

	// special characters
	result = special(result);
	
	// tada!
	return result;
}
