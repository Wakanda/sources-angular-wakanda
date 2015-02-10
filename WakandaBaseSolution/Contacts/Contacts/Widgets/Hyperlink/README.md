##Hyperlink widget for Wakanda
The __Hyperlink__ widget allows you to create a &lt;a&gt; tag  whose source and text can both be datasources. You can use it to create live hyperlinks on your Page that are either email addresses or URLs.

### Properties
The __Hyperlink__ widget has the following properties:
* __URL Source__: Datasource of type Attribute that contains either an email address or a URL.
* __URL text Source__: Datasource of type Attribute that contains the text that appears in the &lt;a&gt;...&lt;/a&gt; tag, which is visible on the browser.
* __Default text__: If the value in the "URL text Source" property is empty, the value in this property will be displayed each time  in the &lt;a&gt;...&lt;/a&gt; tag. By default, the value "Click here" is displayed if nothing is specified in this property.
* __Target__: You can select either "_blank" to force the browser to open a new page/tab or "_self" to allow the browser to replace the existing page.
* __Label__: A label that you can add to the widget.

### More Information
For more information on how to install a custom widget, refer to [Installing a Custom Widget](http://doc.wakanda.org/WakandaStudio0/help/Title/en/page3869.html#1027761).

For more information about Custom Widgets, refer to [Custom Widgets](http://doc.wakanda.org/Wakanda0.v5/help/Title/en/page3863.html "Custom Widgets") in the [Architecture of Wakanda Applications](http://doc.wakanda.org/Wakanda0.v5/help/Title/en/page3844.html "Architecture of Wakanda Applications") manual.
