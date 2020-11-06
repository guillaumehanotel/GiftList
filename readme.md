# Gift List

Start app :  
``
npx react-native start
``  
Start emulator :   
``
npx react-native run-android
``  
Si ça fonctionne pas alors que c'est OK :   
```shell script
watchman watch-del-all   
rm -rf node_modules/ && npm cache clean --force && npm install
npx react-native run-android --reset-cache
```



```javascript
let databsase = {
    "users": { // avec google auth
        "1": {
            "name": "Guillaume",
            "contacts": {
                "C1": true
            },
            "gifts": {
                "G1": true
            },
            "selectedYear": 2020
        }
    },
    "contacts": {
        "C1": {
            "name": "Thibault",
            "budget": 90,
            "attributedGifts": {
                "G1": true
            }
        }
    },
    "gifts": {
        "2020": {
            "G1": {
                "title": "Trotinette",
                "imageUrl": "...",
                "user": "1",
                "contact": "C1"
            }
        },
        "2021": {

        }
    },
}

```
