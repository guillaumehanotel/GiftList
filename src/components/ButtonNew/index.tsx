import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import CreatePerson from 'screens/person/New';
import CreateGift from 'screens/gift/New';
import ButtonNewItem, {ButtonNewItemType} from 'components/ButtonNewItem';

const ButtonNew = () => {
  const [displayBtnNewItem, setdisplayBtnNewItem] = useState(false);

  const buttonNewItems: ButtonNewItemType[] = [
    {
      label: 'Nouvelle personne',
      icon: 'user-plus',
      callbackComponent: CreatePerson,
    },
    {
      label: 'Nouveau cadeau',
      icon: 'gift',
      callbackComponent: CreateGift,
    },
  ];

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonNew}
        onPress={() => setdisplayBtnNewItem(!displayBtnNewItem)}>
        <Icon name="plus" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <View style={styles.buttons}>
        {buttonNewItems.map((item, index) => (
          <ButtonNewItem
            key={index}
            item={item}
            index={index}
            displayBtnNewItem={displayBtnNewItem}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNew: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -400,
    right: 40,
  },
  buttons: {
    flex: 1,
    height: 130,
    width: 210,
    bottom: -340,
    right: 40,
    position: 'absolute',
    justifyContent: 'space-around',
  },
});

export default ButtonNew;
