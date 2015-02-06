var express = require('express');
var client = require('cheerio-httpcli');

var router = express.Router();

var selectors = {
    name: 'div.document-title[itemprop=name]',
    purchaseButton: '.play-button.devices',
    stockStatus: '.inventory-info .in-stock',
    shippingNote: '.inventory-info .shipping-note'
};

router.get('/', function(req, res, next) {

    var resultObj = {
        message: '',
        statusCode: 200,
        data: null
    };

    var deviceName = '';
    if (!req.query || !req.query.id) {
        resultObj.message = 'device not specified. please provide device name with "id" query parameter.';
        resultObj.statusCode = 400;
        res.json(resultObj);

        return;
    }

    deviceName = req.query.id;

    console.log(deviceName);

    client.fetch('http://play.google.com/store/devices/details', {id: deviceName}, function(err, $, res2) {
        if (err) {
            if (err.statusCode === 404) {
                resultObj.message = 'device ' + deviceName + ' was not found.';
            } else {
                resultObj.message = 'something went wrong!';
            }
            resultObj.statusCode = err.statusCode;
            res.json(resultObj);

            return;
        }

        console.log(res2.headers);

        var data = {
            deviceName: deviceName,
            isAvailable: false,
            price: '?',
            stockStatus: '',
            shippingNote: ''
        };

        data.name = $(selectors.name).text().trim();

        var $purchaseBtn = $(selectors.purchaseButton);
        data.isAvailable = !$purchaseBtn.hasClass('disabled');

        var text = $purchaseBtn.text();
        var price = text.slice(text.indexOf('￥')).trim();

        if (price) {
            data.price = price;
        }

        var $stockStatus = $(selectors.stockStatus);
        data.stockStatus = $stockStatus.text().trim();

        var $shippingNote = $(selectors.shippingNote);
        $shippingNote.find('a').remove();
        data.shippingNote = $shippingNote.text().trim();

        res.json({
            message: 'device fetched',
            data: data
        });
    })
});

module.exports = router;