WAF.define('QR', ['waf-core/widget'], function (widget) {

    var QR = widget.create('QR', {
        init: function () {
            var qrcode,
                width,
                height,
                size,
                params = {};

            width = $(this.node).width();
            height = $(this.node).height();
            size = width;
            if (width > height) {
                size = height;
            }

            params.width = size;
            params.height = size;

            params.colorDark = this.colordark();
            params.colorLight = this.colorlight();
            params.CorrectLevel = this.correctlevel();

            $(this.node).empty();
            this._QR = new QRCode(this.node, params);

            this.content.onChange(function (value) {
                this.repaint();
            });

            this.repaint();
        },
        'content': widget.property({
            defaultValue: ''
        }),
        'colordark': widget.property({
            defaultValue: '#000000',
            bindable: false
        }),
        'colorlight': widget.property({
            defaultValue: '#ffffff',
            bindable: false
        }),
        'correctlevel': widget.property({
            defaultValue: 'H',
            bindable: false
        })
    });

    QR.prototype.repaint = function (val) {
        this._QR.makeCode((this.content()) ? this.content() : '');
    };

    return QR;
});
