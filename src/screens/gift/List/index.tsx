import React from 'react';
import ButtonNew from 'components/ButtonNew';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {Content, List} from 'native-base';
import {Gift} from 'screens/gift';
import GiftItem from 'screens/gift/Item';

const GiftList = () => {
  const gifts: Gift[] = useSelector((state: RootState) => state.gift.gifts);

  return (
    <Content>
      <List>
        {gifts.length !== 0 &&
          gifts.map((gift: Gift) => <GiftItem key={gift.key} gift={gift} />)}
      </List>
      <ButtonNew />
    </Content>
  );
};

export default GiftList;
