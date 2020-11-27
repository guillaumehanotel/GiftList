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
      onPress={() => {
        navigation.navigate('FormGift', {addMode: false, gift: gift});
      }}>
      <View style={styles.giftItem}>
        <Text>{gift.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  giftItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    height: 77,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GiftItem;
