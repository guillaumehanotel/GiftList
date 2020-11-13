import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Content, Form, Item, Input, Label, Toast} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {PersonForm} from 'screens/person';
import {associatePersonToUser, storePerson} from 'database';
import {User} from '@react-native-community/google-signin';

const CreatePerson = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const [personForm, setPersonForm] = useState<PersonForm>({
    name: '',
    budget: '',
  });
  const navigation = useNavigation();

  const _savePerson = useCallback(async () => {
    const newPersonKey = await storePerson(personForm);
    await associatePersonToUser(user, newPersonKey);
  }, [personForm, user]);

  const _submitPersonForm = useCallback(async () => {
    if (personForm.name) {
      await _savePerson();
      navigation.goBack();
    } else {
      Toast.show({
        type: 'warning',
        text: 'Fill the name input !',
        buttonText: 'Okay',
      });
    }
  }, [personForm, _savePerson, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => _submitPersonForm()}
          style={{marginRight: 15}}>
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
          <Input
            onChangeText={(text) => setPersonForm({...personForm, name: text})}
            value={personForm.name}
          />
        </Item>
        <Item floatingLabel>
          <Label>Budget EUR (facultatif)</Label>
          <Input
            keyboardType="numeric"
            onChangeText={(text) =>
              setPersonForm({...personForm, budget: text})
            }
            value={personForm.budget}
          />
        </Item>
      </Form>
    </Content>
  );
};

export default CreatePerson;
