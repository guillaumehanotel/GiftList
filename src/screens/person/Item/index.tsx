import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Person} from 'screens/person';
import images from 'assets';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {useNavigation} from '@react-navigation/native';
import {filterGiftsByUserPerson} from 'database/gift';

interface PersonItemProps {
  person: Person;
}

const PersonItem = ({person}: PersonItemProps) => {
  const navigation = useNavigation();
  const gifts = useSelector((state: RootState) => state.gift.gifts);
  const [giftNumber, setGiftNumber] = useState(0);

  useEffect(() => {
    (async () => {
      const personGifts = await filterGiftsByUserPerson(gifts, person);
      setGiftNumber(personGifts.length);
    })();
  }, [gifts, person]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FormPerson', {addMode: false, person: person});
      }}>
      <View style={styles.personItem}>
        {/* @ts-ignore */}
        <Image source={images[person.icon]} style={styles.avatar} />
        <View>
          <Text>{person.name}</Text>
          <Text>X / {giftNumber} cadeaux achetés.</Text>
        </View>
      </View>
    </TouchableOpacity>
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
