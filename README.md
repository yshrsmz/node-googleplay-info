google-play-store-info
======================

Unofficial Google Play API to retrieve app info & device product info.


# installation

```
npm install --save googleplay-info
```

# api

```javascript
var GooglePlayInfo = require('googleplay-info');

// get app info
GooglePlayInfo.getAppDetail('some.nice.app.package', function(err, data) {
  console.log(data);
  
  //{
  //  "message": "app com.instagram.layout fetched",
  //  "statusCode": 200,
  //  "data": {
  //    "package": "some.nice.app.package",
  //    "name": "Some Nice App for Android",
  //    "version": "1.0.3"
  //  }
  //}
});

// get selling device list
GooglePlayInfo.getDevices(function(err, data) {
  console.log(data);
  
  //{
  //  "message": "device list fetched",
  //  "statusCode": 200,
  //  "data": [
  //    {
  //      "name": "nexus_6",
  //      "link": "http://store.google.com/product/nexus_6"
  //    },
  //    {
  //      "name": "_chromecast",
  //      "link": "http://store.google.com/product/_chromecast"
  //    },
  //    {
  //      "name": "nexus_9",
  //      "link": "http://store.google.com/product/nexus_9"
  //    },
  //    {
  //      "name": "_nexus_player",
  //      "link": "http://store.google.com/product/_nexus_player"
  //    },
  //    {
  //      "name": "nexus_6",
  //      "link": "http://store.google.com/product/nexus_6"
  //    },
  //    {
  //      "name": "nexus_9",
  //      "link": "http://store.google.com/product/nexus_9"
  //    }
  //  ]
  //}
});

// get device info
GooglePlayInfo.getDeviceDetail('nexus_6', function(err, data) {
  console.log(data);
  
  //{
  //  "message": "device fetched",
  //  "data": {
  //    "deviceName": "nexus_6",
  //    "available": false,
  //    "variants": [
  //      {
  //        "name": "nexus_6_blue_32gb",
  //        "price": "￥75,170",
  //        "available": true,
  //        "shipping": "1～2 営業日以内に出荷されます。"
  //      },
  //      {
  //        "name": "nexus_6_white_32gb",
  //        "price": "￥75,170",
  //        "available": true,
  //        "shipping": "1～2 営業日以内に出荷されます。"
  //      },
  //      {
  //        "name": "nexus_6_blue_64gb",
  //        "price": "￥85,540",
  //        "available": true,
  //        "shipping": "1～2 営業日以内に出荷されます。"
  //      },
  //      {
  //        "name": "nexus_6_white_64gb",
  //        "price": "￥85,540",
  //        "available": true,
  //        "shipping": "1～2 営業日以内に出荷されます。"
  //      }
  //    ],
  //    "name": "Nexus 6"
  //  }
  //}
});
```

# how to run example

```
npm install 
cd example
npm install .
npm start # run on localhost:3000
```

## app info
http://{server_path}/app-detail?id={app_package_name}

## device list
http://{server_path}/devices


## device info
http://{server_path}/device-detail?id={device_name}