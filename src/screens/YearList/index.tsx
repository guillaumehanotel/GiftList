import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';

const YearList = () => {
  useEffect(() => {
    database()
      .ref('/years')
      .once('value' as FirebaseDatabaseTypes.EventType)
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  });

  return (
    <View>
      <Text>Year List</Text>
    </View>
  );
};

export default YearList;
