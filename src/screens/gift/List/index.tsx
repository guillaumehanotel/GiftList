import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {Gift} from 'screens/gift';
import {FlatList, View} from 'react-native';
import _ from 'lodash';
import {Person} from 'screens/person';
import PersonGifts from './PersonGifts';
import ButtonNew from 'components/ButtonNew';

const GiftList = () => {
  const gifts: Gift[] = useSelector((state: RootState) => state.gift.gifts);
  const persons: Person[] = useSelector(
    (state: RootState) => state.person.persons,
  );
  const [personsWithGifts, setPersonsWithGift] = useState<Person[]>([]);

  useEffect(() => {
    const personsKey = _.uniqBy(gifts, 'person').map(
      (gift: Gift) => gift.person,
    );
    setPersonsWithGift(
      persons.filter((person: Person) => personsKey.includes(person.key)),
    );
  }, [persons, gifts]);

  return (
    <View>
      <FlatList
        data={personsWithGifts}
        renderItem={({item}) => <PersonGifts key={item.key} person={item} />}
      />
      <ButtonNew />
    </View>
  );
};

export default GiftList;
