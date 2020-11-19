import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Person} from 'screens/person';
import images from 'assets';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {Gift} from 'screens/gift';

interface PersonItemProps {
  person: Person;
}

const PersonItem = ({person}: PersonItemProps) => {
  const gifts = useSelector((state: RootState) => state.gift.gifts);
  const [giftNumber, setGiftNumber] = useState(0);

  /**
   * Il faudrait idéalement utiliser un Selector avec reselect ou
   * re-reselect mais trop complexe => KISS
   */
  const _getGiftsByUserPerson = useCallback(() => {
    const personGifts: Gift[] = [];
    if (person.attributedGifts) {
      personGifts.push(
        ...gifts.filter((gift: Gift) => gift.person === person.key),
      );
    }
    return personGifts;
  }, [gifts, person]);

  useEffect(() => {
    (async () => {
      const personGifts = await _getGiftsByUserPerson();
      setGiftNumber(personGifts.length);
    })();
  }, [_getGiftsByUserPerson]);

  return (
    <View style={styles.personItem}>
      {/* @ts-ignore */}
      <Image source={images[person.icon]} style={styles.avatar} />
      <View>
        <Text>{person.name}</Text>
        <Text>X / {giftNumber} cadeaux achetés.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  personItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    height: 77,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    margin: 10,
  },
});

export default PersonItem;
