import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export type ButtonNewItemType = {
  label: string;
  icon: string;
  callbackComponent: Function;
};

interface ButtonNewItemProps {
  index: number;
  item: ButtonNewItemType;
}

const ButtonNewItem = ({item, index}: ButtonNewItemProps) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={[
          styles.buttonNewItemLabel,
          {bottom: -391 + (index + 1.01) * 60},
        ]}>
        {item.label}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(item.callbackComponent.name)}
        style={[styles.buttonNewItem, {bottom: -400 + (index + 1) * 60}]}>
        <Icon name={item.icon} type="font-awesome-5" color="white" size={18} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNewItem: {
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -350,
    right: 40,
  },
  buttonNewItemLabel: {
    position: 'absolute',
    right: 100,
    height: 25,
    lineHeight: 25,
    backgroundColor: 'rgba(35,35,35,0.8)',
    color: 'white',
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default ButtonNewItem;
