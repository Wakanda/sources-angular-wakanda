(function(Hyperlink) {

    /*Default width and height of your widget when added to the Page*/
    Hyperlink.setWidth('200');
    Hyperlink.setHeight('20');

    /*Customize existing properties*/
    Hyperlink.customizeProperty('url', {
        sourceTitle: 'URL Source',
        description: 'Bind a datasource containing a URL or email.',
        display: false,
        sourceDisplay: true
    });
    Hyperlink.customizeProperty('urlText', {
        sourceTitle: 'URL text Source',
        description: 'Bind a datasource containing the text to display for the hyperlink.',
        display: false,
        sourceDisplay: true
    });
    Hyperlink.customizeProperty('defaultText', {
        title: 'Default text',
        type: 'textarea',
        description: 'Default text to display if the URL Text Source is blank.',
        display: true,
        sourceDisplay: false
    });
    Hyperlink.customizeProperty('target', {
        title: 'Target',
        description: 'Default text to display if the URL Text Source is blank.',
        type: 'dropdown',
        options: ['_blank', '_self'],
        display: true,
        sourceDisplay: false
    });

    /*Create label property*/
    Hyperlink.addLabel({
        defaultValue: 'Hyperlink',
        position: 'left'
    });

    /*Set the Design and Styles panels*/
    Hyperlink.setPanelStyle({
        'fClass': true,
        'text': true,
        'background': true,
        'border': true,
        'sizePosition': true,
        'label': true,
        'disabled': ['border-radius']
    });
    
});
