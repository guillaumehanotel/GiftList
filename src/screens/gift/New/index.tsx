import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Content, Form, Item, Input, Label, Toast, Picker} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {GiftForm, PersonItem, STATES} from '@screens/gift';
import {User} from '@react-native-community/google-signin';
import {
  getPersons,
  storeGift,
  associateGiftToUser,
  associateGiftToPerson,
} from 'database';

const CreateGift = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const year = useSelector((state: RootState) => state.year.year);
  const navigation = useNavigation();
  const [knownPersons, setKnownPersons] = useState<PersonItem[]>([]);
  const [giftForm, setGiftForm] = useState<GiftForm>({
    title: '',
    price: '',
    notes: '',
    person: '',
    state: STATES[0],
  });

  useEffect(() => {
    (async () => {
      const persons = await getPersons(user);
      setKnownPersons(persons);
    })();
  }, [user]);

  const _saveGift = useCallback(async () => {
    const newGiftKey = await storeGift(giftForm, year);
    await associateGiftToUser(user, newGiftKey);
    await associateGiftToPerson(giftForm.person, newGiftKey);
  }, [giftForm, user, year]);

  const _submitGiftForm = useCallback(async () => {
    if (giftForm.title && giftForm.person && giftForm.state) {
      await _saveGift();
    } else {
      Toast.show({
        type: 'warning',
        text: 'Fill at least the title input !',
        buttonText: 'Okay',
      });
    }
  }, [_saveGift, giftForm]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => _submitGiftForm()}
          style={{marginRight: 15}}>
          <Icon name="check" type="font-awesome-5" />
        </TouchableOpacity>
      ),
    });
  }, [_submitGiftForm, navigation]);

  return (
    <Content style={{width: 300}}>
      <Form>
        <Item floatingLabel>
          <Label>Nom du cadeau</Label>
          <Input
            onChangeText={(text) => setGiftForm({...giftForm, title: text})}
            value={giftForm.title}
          />
        </Item>

        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Destinataire"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={giftForm.person}
            onValueChange={(value) => {
              setGiftForm({...giftForm, person: value});
            }}>
            {knownPersons.map(({key, name}, itemIndex) => (
              <Picker.Item key={itemIndex} label={name} value={key} />
            ))}
          </Picker>
        </Item>
        <Item floatingLabel>
          <Label>Valeur du cadeau (facultatif)</Label>
          <Input
            onChangeText={(text) => setGiftForm({...giftForm, price: text})}
            value={giftForm.price}
            keyboardType="numeric"
          />
        </Item>
        <Item floatingLabel>
          <Label>Notes (facultatif)</Label>
          <Input
            onChangeText={(text) => setGiftForm({...giftForm, notes: text})}
            value={giftForm.notes}
          />
        </Item>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Etat"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={giftForm.state}
            onValueChange={(value) => {
              setGiftForm({...giftForm, state: value});
            }}>
            {STATES.map((item, itemIndex) => (
              <Picker.Item
                key={itemIndex}
                label={item.toString()}
                value={item}
              />
            ))}
          </Picker>
        </Item>
      </Form>
    </Content>
  );
};

export default CreateGift;
