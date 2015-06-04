var express = require('express');
var GooglePlayInfo = require('../../index');

var router = express.Router();

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

    GooglePlayInfo.getAppDetail(appPackage, function(err, data) {
        if (err) {
            res.json(data);
            return;
        }

        res.json(data);
    });
});

module.exports = router;
