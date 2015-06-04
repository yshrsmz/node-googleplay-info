'use strict';

var devices = require('./devices');
var deviceDetail = require('./device-detail');
var appDetail = require('./app-detail');

var GooglePlayInfo = {
    getDevices: devices.getDevices,
    getDeviceDetail: deviceDetail.getDeviceDetail,
    getAppDetail: appDetail.getAppDetail
};

module.exports = GooglePlayInfo;