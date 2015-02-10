WAF.define('TestCustomWidget', ['waf-core/widget'], function(widget) {
	
    var TestCustomWidget = widget.create('TestCustomWidget', {
        init: function() {
//            /* Define a custom event */
//            this.fire('myEvent', {
//                message: 'Hello'
//            });
        }
//        ,
        
//        /* Create a property */
//        test: widget.property({
//            onChange: function(newValue) {
//                this.node.innerHTML = this.test(); /* this contains the widget and newValue contains its current value */
//            }
//        })
    });

//    /* Map the custom event above to the DOM click event */
//    TestCustomWidget.mapDomEvents({
//        'click': 'action'
//    });

    return TestCustomWidget;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */