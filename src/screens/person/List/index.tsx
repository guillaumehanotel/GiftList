import React from 'react';
import {Person} from 'screens/person';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import PersonItem from 'screens/person/Item';
import ButtonNew from 'components/ButtonNew';
import {FlatList, SafeAreaView} from 'react-native';

const UserList = () => {
  const persons: Person[] = useSelector(
    (state: RootState) => state.person.persons,
  );

  return (
    <SafeAreaView>
      <FlatList
        data={persons}
        renderItem={({item}) => <PersonItem key={item.key} person={item} />}
      />
      <ButtonNew />
    </SafeAreaView>
  );
};

export default UserList;
