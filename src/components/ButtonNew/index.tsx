import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import FormPerson from 'screens/person/Form';
import FormGift from 'screens/gift/Form';
import ButtonNewItem, {ButtonNewItemType} from 'components/ButtonNewItem';

const ButtonNew = () => {
  const [displayBtnNewItem, setdisplayBtnNewItem] = useState(false);

  const buttonNewItems: ButtonNewItemType[] = [
    {
      label: 'Nouvelle personne',
      icon: 'user-plus',
      callbackComponent: FormPerson,
    },
    {
      label: 'Nouveau cadeau',
      icon: 'gift',
      callbackComponent: FormGift,
    },
  ];

  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={styles.buttonNew}
        onPress={() => setdisplayBtnNewItem(!displayBtnNewItem)}>
        <Icon name="plus" type="font-awesome-5" color="white" />
      </TouchableOpacity>
      <View style={styles.buttonsNewItem}>
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
  buttons: {
    position: 'absolute',
    // borderWidth: 1,
    top: 258,
    left: 130,
    flex: 1,
    height: 180,
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
    zIndex: 50,
  },
  buttonNew: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsNewItem: {
    flex: 1,
    height: 130,
    width: 210,
    justifyContent: 'space-around',
  },
});

export default ButtonNew;
