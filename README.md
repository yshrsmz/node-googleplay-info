google-play-store-info
======================

Google Play Storeのアプリ情報/端末情報をスクレイピングしてJSONフォーマットで返すよ

# how to start
```
npm install .
npm start
```


# app info
http://{server_path}/app-detail?id={app_package_name}

```
{
  "message":"app fetched",
  "data":{
    "package":"jp.tell_me.android",
    "name":"テルミー 悩み・相談から質問まで99％回答掲示板アプリ",
    "version":"2.0.5"
  }
}
```

# device info
http://{server_path/device-detail?id={device_name}

```
{
  "message": "device fetched",
  "data": {
    "deviceName": "nexus_9_black_16gb_wifi",
    "isAvailable": true,
    "price": "￥43,090",
    "stockStatus": "在庫あり",
    "shippingNote": "1～2 営業日以内に出荷されます。",
    "name": "Nexus 9（16 GB、Wi-Fi、インディゴ ブラック）"
  }
}
```