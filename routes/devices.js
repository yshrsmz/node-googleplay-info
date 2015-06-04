var express = require('express');
var client = require('cheerio-httpcli');

var router = express.Router();

var selectors = {
    link: 'div.row a[data-title][href^=\\/product]'
};

var storeLink = 'http://store.google.com';

router.get('/', function(req, res, next) {
    var resultObj = {
        message: '',
        statusCode: 200,
        data: null
    };

    client.fetch(storeLink, {}, function(err, $, res2) {
        if (err) {
            if (err.statusCode === 404) {
                resultObj.message = '404 not fount';
            } else {
                resultObj.message = 'some thing went wrong!';
            }
            resultObj.statusCode = err.statusCode;
            res.json(resultObj);
        }

        resultObj.data = [];

        var products = $(selectors.link);

        products.each(function(idx) {
            var $el = $(this);
            var link = $el.attr('href');
            var linkData = {
                name: link.slice(9),
                link: storeLink + link
            };

            if (resultObj.data.indexOf(linkData) < 0) {
                resultObj.data.push(linkData);
            }
        });

        resultObj.message = 'device list fetched';

        console.log(resultObj.data);
        res.json(resultObj);
    });
});

module.exports = router;