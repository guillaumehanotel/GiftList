# Gift List


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
