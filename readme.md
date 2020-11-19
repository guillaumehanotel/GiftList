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

- Commentaires
- https://christmas-days.anvil.app/_/api/get_days
- Utiliser les generics pour le database wrapper
- I18N
- Controle Input utilisateur
- Compléter un max de types ts

## Questions ?
- Bouton en overlay sur une tab navigation
- où mettre les constantes ?
- Est-ce que ma structure de DB est correct ?
- Faire des getters avec paramètre sur le state est assez compliqué
- Pourquoi on utilise encore le connect / mapStateToProps / mapDispatchToProps (https://redux.js.org/recipes/computing-derived-data)
alors que la méthode qui semble être privilégié est l'utilisation des 
hooks (useDispatch)
- Ai-je bien fait de mettre les cadeaux et les personnes dans le state global ?
- Si non, quelle est la méthode privilégiée pour récupérer dans la liste
une nouvelle entité qui vient d'être créé ? 

## DB Schema
```javascript
let databsase = {
    "users": { // avec google auth
        "1": {
            "name": "Guillaume",
            "persons": {
                "C1": true
            },
            "gifts": {
                "G1": true
            },
            "selectedYear": 2020
        }
    },
    "persons": {
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
                "person": "C1"
            }
        },
        "2021": {

        }
    }, 
}

```
