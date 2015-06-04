var express = require('express');
var client = require('cheerio-httpcli');

var router = express.Router();

var selectors = {
    name: 'h1.title-text',
    variant: 'div[data-available][data-backend-docid][data-price]',
    variantAvailable: 'data-available',
    variantName: 'data-backend-docid',
    variantPrice: 'data-price',
    variantShipping: 'data-shipping'
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

    client.fetch('https://store.google.com/product/' + deviceName, {}, function(err, $, res2) {
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
            available: false,
            variants: []
        };

        data.name = $(selectors.name).text().trim();

        var $variants = $(selectors.variant);

        $variants.each(function(idx) {
            var $el = $(this);
            var variant = {
                name: $el.attr(selectors.variantName).trim(),
                price: $el.attr(selectors.variantPrice).trim(),
                available: $el.attr(selectors.variantAvailable).trim() === 'true',
                shipping: $el.attr(selectors.variantShipping).trim()
            };

            if (variant.available) {
                data.available = true;
            }

            data.variants.push(variant);
        });

        res.json({
            message: 'device fetched',
            data: data
        });
    })
});

module.exports = router;