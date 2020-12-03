import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {Gift} from 'screens/gift';
import GiftItem from 'screens/gift/Item';
import {StyleSheet, Text, View} from 'react-native';
import {Person} from 'screens/person';

interface PersonGiftsProps {
  person: Person;
}

const PersonGifts = ({person}: PersonGiftsProps) => {
  const gifts: Gift[] = useSelector((state: RootState) => state.gift.gifts);
  const [giftsByPerson, setGiftsByPerson] = useState<Gift[]>([]);

  useEffect(() => {
    setGiftsByPerson(gifts.filter((gift: Gift) => gift.person === person.key));
  }, [gifts, person]);

  return (
    <View>
      <View style={styles.personTitle}>
        <Text style={styles.personTitleText}>{person.name}</Text>
      </View>
      {giftsByPerson.map((item) => (
        <GiftItem key={item.key} gift={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  personTitle: {
    backgroundColor: '#de0505',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 30,
  },
  personTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PersonGifts;
