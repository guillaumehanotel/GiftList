import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import CreatePerson from 'screens/CreatePerson';
import CreateGift from 'screens/CreateGift';
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
      {displayBtnNewItem &&
        buttonNewItems.map((item, index) => (
          <ButtonNewItem key={index} item={item} index={index} />
        ))}
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
});

export default ButtonNew;
