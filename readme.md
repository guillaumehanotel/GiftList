# Gift List

## Utils
Start app :  
``
npx react-native start
``  
Start emulator :   
``
~/Android/Sdk/emulator/emulator -avd Nexus_5_API_30&
npx react-native run-android
``  
Si ça fonctionne pas alors que c'est OK :   
```shell script
watchman watch-del-all   
rm -rf node_modules/ && npm cache clean --force && npm install
npx react-native start --reset-cache
```

## TODO

- https://christmas-days.anvil.app/_/api/get_days
- I18N
- Controle Input utilisateur

## DB Schema
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
    "years": [
      2020, 2021, 2022 
    ]   
}

```
