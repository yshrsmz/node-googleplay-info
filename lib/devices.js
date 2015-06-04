'use strict';

var client = require('cheerio-httpcli');

var selectors = {
    link: 'div.row a[data-title][href^=\\/product]'
};

var storeLink = 'http://store.google.com';

module.exports = {
    getDevices: function(cb) {

        client.fetch(storeLink, {}, function(err, $, res) {
            var result = {
                message: '',
                statusCode: 200,
                data: null
            };
            if (err) {

                if (err.statusCode === 404) {
                    result.message = 'devices do not found';
                } else {
                    result.message = 'some thing went wrong!';
                }
                result.statusCode = err.statusCode;

                cb(new Error(result.message), result);
                return;
            }

            var data = [];

            $(selectors.link).each(function(idx) {
                var $el = $(this);
                var link = $el.attr('href');
                var linkData = {
                    name: link.slice(9),
                    link: storeLink + link
                };

                if (data.indexOf(linkData) < 0) {
                    data.push(linkData);
                }
            });

            result.message = 'device list fetched';
            result.data = data;

            cb(null, result);
        });
    }
};