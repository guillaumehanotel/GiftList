import React from 'react';
import {Text} from 'react-native';
import {ListItem} from 'native-base';
import {Gift} from 'screens/gift';

interface GiftItemProps {
  gift: Gift;
}

const GiftItem = ({gift}: GiftItemProps) => {
  return (
    <ListItem>
      <Text>{gift.title}</Text>
    </ListItem>
  );
};

export default GiftItem;
