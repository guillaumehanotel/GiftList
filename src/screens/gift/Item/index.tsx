import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gift} from 'screens/gift';
import {useNavigation} from '@react-navigation/native';

interface GiftItemProps {
  gift: Gift;
}

const GiftItem = ({gift}: GiftItemProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.giftItemButton}
      onPress={() => {
        navigation.navigate('FormGift', {addMode: false, gift: gift});
      }}>
      <View style={styles.giftItem}>
        <View style={styles.giftItemTextLeft}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{gift.title}</Text>
          <Text>{gift.price.toFixed(2).replace('.', ',')} €</Text>
        </View>
        <View style={styles.giftItemTextRight}>
          <Text>{gift.state}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  giftItemButton: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    elevation: 8,
  },
  giftItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    height: 60,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  giftItemTextLeft: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 5,
  },
  giftItemTextRight: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});

export default GiftItem;
