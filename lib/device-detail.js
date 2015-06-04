'use strict';

var client = require('cheerio-httpcli');

var selectors = {
    name: 'h1.title-text',
    variant: 'div[data-available][data-backend-docid][data-price]',
    variantAvailable: 'data-available',
    variantName: 'data-backend-docid',
    variantPrice: 'data-price',
    variantShipping: 'data-shipping'
};

module.exports = {
    getDeviceDetail: function(deviceName, cb) {

        if (!deviceName) {
            cb(new Error('Please specify device name'), null);
            return;
        }

        client.fetch('https://store.google.com/product/' + deviceName, {}, function(err, $, res) {
            var result = {
                message: '',
                statusCode: 200,
                data: null
            };
            if (err) {

                if (err.statusCode === 404) {
                    result.message = 'device ' + deviceName + ' does not found';
                } else {
                    result.message = 'some thing went wrong!';
                }
                result.statusCode = err.statusCode;

                cb(new Error(result.message), result);
                return;
            }

            var data = {
                name: $(selectors.name).text().trim(),
                deviceName: deviceName,
                available: false,
                variants: []
            };

            $(selectors.variant).each(function(idx) {
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

            result.message = 'device ' + deviceName + ' fetched';
            result.data = data;

            cb(null, result);
        });
    }
};