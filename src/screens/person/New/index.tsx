import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Content, Form, Item, Input, Label, Toast} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {RootState} from 'store';

const CreatePerson = () => {
  const {user} = useSelector((state: RootState) => state.auth.user) || {};
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const navigation = useNavigation();

  const _savePerson = useCallback(
    async (name: string, budget: string) => {
      const newPerson = await database()
        .ref('/persons')
        .push({
          name: name,
          budget: budget === '' ? 0 : budget,
        });

      await database()
        .ref('/users/' + user?.id + '/persons')
        .set({
          // @ts-ignore
          [newPerson.key]: true,
        });
    },
    [user],
  );

  const _submitPersonForm = useCallback(async () => {
    if (name) {
      await _savePerson(name, budget);
    } else {
      Toast.show({
        type: 'warning',
        text: 'Fill the name input !',
        buttonText: 'Okay',
      });
    }
  }, [_savePerson, name, budget]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => _submitPersonForm()}
          style={{marginRight: 10}}>
          <Icon name="check" type="font-awesome-5" />
        </TouchableOpacity>
      ),
    });
  }, [_submitPersonForm, navigation]);

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Label>Nom</Label>
          <Input onChangeText={(text) => setName(text)} value={name} />
        </Item>
        <Item floatingLabel>
          <Label>Budget EUR (facultatif)</Label>
          <Input
            keyboardType="numeric"
            onChangeText={(text) => setBudget(text)}
            value={budget}
          />
        </Item>
      </Form>
    </Content>
  );
};

export default CreatePerson;
