google-play-store-info
======================

Google Play Storeのアプリ情報/端末情報をスクレイピングしてJSONフォーマットで返すよ

# how to start
```
npm install .
npm start # run on localhost:3000
```


# app info
http://{server_path}/app-detail?id={app_package_name}

```
{
  "message": "app com.instagram.layout fetched",
  "statusCode": 200,
  "data": {
    "package": "com.instagram.layout",
    "name": "Layout from Instagram",
    "version": "1.0.3"
  }
}
```

# device list
http://{server_path}/devices

```
{
  "message": "device list fetched",
  "statusCode": 200,
  "data": [
    {
      "name": "nexus_6",
      "link": "http://store.google.com/product/nexus_6"
    },
    {
      "name": "_chromecast",
      "link": "http://store.google.com/product/_chromecast"
    },
    {
      "name": "nexus_9",
      "link": "http://store.google.com/product/nexus_9"
    },
    {
      "name": "_nexus_player",
      "link": "http://store.google.com/product/_nexus_player"
    },
    {
      "name": "nexus_6",
      "link": "http://store.google.com/product/nexus_6"
    },
    {
      "name": "nexus_9",
      "link": "http://store.google.com/product/nexus_9"
    }
  ]
}
```


# device info
http://{server_path}/device-detail?id={device_name}

```
{
  "message": "device fetched",
  "data": {
    "deviceName": "nexus_6",
    "isAvailable": false,
    "variants": [
      {
        "name": "nexus_6_blue_32gb",
        "price": "￥75,170",
        "available": true,
        "shipping": "1～2 営業日以内に出荷されます。"
      },
      {
        "name": "nexus_6_white_32gb",
        "price": "￥75,170",
        "available": true,
        "shipping": "1～2 営業日以内に出荷されます。"
      },
      {
        "name": "nexus_6_blue_64gb",
        "price": "￥85,540",
        "available": true,
        "shipping": "1～2 営業日以内に出荷されます。"
      },
      {
        "name": "nexus_6_white_64gb",
        "price": "￥85,540",
        "available": true,
        "shipping": "1～2 営業日以内に出荷されます。"
      }
    ],
    "name": "Nexus 6"
  }
}
```