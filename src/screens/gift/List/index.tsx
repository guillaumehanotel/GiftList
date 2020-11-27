import React from 'react';
import ButtonNew from 'components/ButtonNew';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {Gift} from 'screens/gift';
import GiftItem from 'screens/gift/Item';
import {FlatList, SafeAreaView} from 'react-native';

const GiftList = () => {
  const gifts: Gift[] = useSelector((state: RootState) => state.gift.gifts);

  return (
    <SafeAreaView>
      <FlatList
        data={gifts}
        renderItem={({item}) => <GiftItem key={item.key} gift={item} />}
      />
      <ButtonNew />
    </SafeAreaView>
  );
};

export default GiftList;
