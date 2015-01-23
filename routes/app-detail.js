var express = require('express');
var client = require('cheerio-httpcli');

var router = express.Router();

var selectors = {
    name: 'div.document-title[itemprop=name]',
    version: 'div.content[itemprop=softwareVersion]'
};

router.get('/', function(req, res, next) {
    var resultObj = {
        message: '',
        statusCode: 200,
        data: null
    };

    var appPackage = '';
    if (!req.query || !req.query.id) {
        resultObj.message = 'app package is not specified. please provide package name with "id" query parameter.';
        resultObj.statusCode = 400;
        res.json(resultObj);
        return;
    }
    appPackage = req.query.id;

    console.log(appPackage);

    client.fetch('http://play.google.com/store/apps/details', {id: appPackage}, function(err, $, res2) {
        if (err) {
            if (err.statuCode === 404) {
                resultObj.message = 'app ' + appPackage + ' was not found';
            } else {
                resultObj.message = 'some thing went wrong!';
            }
            resultObj.statusCode = err.statusCode;
            res.json(resultObj);
        }
        console.log(res2.headers);

        var data = {
            package: appPackage
        };

        var keys = Object.keys(selectors);
        keys.forEach(function(key) {
            console.log(key);
            data[key] = $(selectors[key]).text().trim();
        });

        resultObj.message = 'app ' + appPackage + ' fetched';
        resultObj.data = data;

        res.json({
            message: 'app fetched',
            data: data
        });
    });
});

module.exports = router;