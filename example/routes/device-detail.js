var express = require('express');
var GooglePlayInfo = require('../../index');

var router = express.Router();


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

    GooglePlayInfo.getDeviceDetail(deviceName, function(err, data) {
        if (err) {
            res.json(data);
            return;
        }

        res.json(data);
    });
});

module.exports = router;