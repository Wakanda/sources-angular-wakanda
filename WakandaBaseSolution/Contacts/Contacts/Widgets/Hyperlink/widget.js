WAF.define('Hyperlink', function() {
    var widget = WAF.require('waf-core/widget');
    var Hyperlink = widget.create('Hyperlink');

    /**
     * This function builds the hyperlink to be returned in the widget. 
     * @class Hyperlink
     * @method updateLink 
     */
    Hyperlink.prototype._updateLink = function() {
        var hyperlinkValue = this.url(),
            hyperlinkText = this.urlText(),
            targetText = this.target(),
            hyperlinkDefaultText = this.options.defaulttext; // binded properties
        if (hyperlinkValue) { //if there is a value in the hyperlink source property   
            var prefix = /[a-z0-9._+-]+@[a-z0-9._-]+\.[a-z]{2,5}/.test(hyperlinkValue) ? 'mailto:' : '',
                //test to see if the hyperlink is an email address, if so add "mailto:"
                targetToDisplay = '',
                linkTextToDisplay = '';

            if (prefix === '') { //add target to URLs and not emails	
                if (hyperlinkValue && hyperlinkValue.substring(0, 7) !== 'http://') { //if the http:// is not in the URL, add it
                    hyperlinkValue = 'http://' + hyperlinkValue;
                }
                targetToDisplay = ' target="' + targetText + '"';
            } else {
                targetToDisplay = '';
            }

            if (hyperlinkText && hyperlinkText !== '') {
                linkTextToDisplay = hyperlinkText; //get hyperlink text
            } else {
                if (hyperlinkDefaultText) {
                    linkTextToDisplay = hyperlinkDefaultText; //if no hyperlink text, get default text from data-text property
                } else {
                    linkTextToDisplay = "Click here"; //if all else fails, use this text
                }
            }
            this.node.innerHTML = '<a ' + targetToDisplay + 'href="' + prefix + hyperlinkValue + '">' + linkTextToDisplay + '</a>'; //insert <a> tag inside the <div> tag
        } else {
            this.node.innerHTML = ""; //no URL available
        }
    };


    Hyperlink.addProperty("url", { //data-binding-url property 
        onChange: function(myValue) {
            this._updateLink(); //update hyperlink when the URL Text property is changed
        }
    });

    Hyperlink.addProperty("urlText", { //data-binding-urlText property 
        onChange: function(myValue) {
            this._updateLink(); //update hyperlink when the URL Text Source property is changed 
        }
    });

    Hyperlink.addProperty("target"); //data-target property
    Hyperlink.addProperty("defaultText", { //data-defaulttext property
        defaultValue: 'Click here'
    });

    return Hyperlink;

});
