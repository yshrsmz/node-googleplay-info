'use strict';

var client = require('cheerio-httpcli');

var selectors = {
    name: 'div.document-title[itemprop=name]',
    version: 'div.content[itemprop=softwareVersion]'
};

module.exports = {
    getAppDetail: function(id, cb) {

        if (!id) {
            cb(new Error('Please specify app package name'), null);
            return;
        }

        client.fetch('http://play.google.com/store/apps/details', { id: id }, function(err, $, res) {
            var result = {
                message: '',
                statusCode: 200,
                data: null
            };
            if (err) {

                if (err.statusCode === 404) {
                    result.message = 'app ' + id + ' does not found';
                } else {
                    result.message = 'some thing went wrong!';
                }
                result.statusCode = err.statusCode;

                cb(new Error(result.message), result);
                return;
            }

            var data = {
                package: id
            };

            Object.keys(selectors).forEach(function(key) {
                data[key] = $(selectors[key]).text().trim();
            });

            result.message = 'app ' + id + ' fetched';
            result.data = data;

            cb(null, result);
        });
    }
};