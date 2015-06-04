var express = require('express');
var GooglePlayInfo = require('../../index');


var router = express.Router();

router.get('/', function(req, res, next) {

    GooglePlayInfo.getDevices(function(err, data) {
        if (err) {
            res.json(data);
            return;
        }

        res.json(data);
    });
});

module.exports = router;