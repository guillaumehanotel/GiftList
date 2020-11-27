import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Content, Form, Item, Input, Toast, Picker} from 'native-base';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {GiftForm, ParamGiftForm, PersonItem, STATES} from '@screens/gift';
import {User} from '@react-native-community/google-signin';
import {getPersons} from 'database';
import {removeGift, saveGift, updateGift} from 'store/gift/actions';
import {toString} from 'helpers';

const FormGift = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const year = useSelector((state: RootState) => state.year.year);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ParamGiftForm, 'FormGift'>>();
  const [knownPersons, setKnownPersons] = useState<PersonItem[]>([]);
  const [giftForm, setGiftForm] = useState<GiftForm>({
    title: '',
    price: '',
    notes: '',
    personKey: '',
    state: STATES[0],
  });

  useEffect(() => {
    (async () => {
      const persons = await getPersons(user);
      setKnownPersons(persons);
    })();
  }, [user]);

  useEffect(() => {
    if (route.params && !route.params.addMode) {
      const {gift} = route.params;
      if (gift !== undefined) {
        setGiftForm({
          title: gift.title,
          price: toString(gift.price),
          notes: gift.notes,
          personKey: gift.personKey,
          state: gift.state,
        });
      }
    }
  }, [route]);

  const _submitGiftForm = useCallback(async () => {
    if (giftForm.title && giftForm.personKey && giftForm.state) {
      if (route.params.addMode) {
        await dispatch(saveGift(user, year, giftForm));
      } else {
        const {gift} = route.params;
        if (gift !== undefined) {
          await dispatch(updateGift(gift, giftForm, year));
        }
      }
      navigation.goBack();
    } else {
      Toast.show({
        type: 'warning',
        text: 'Fill at least the title input !',
        buttonText: 'Okay',
      });
    }
  }, [dispatch, giftForm, navigation, route.params, user, year]);

  const renderAddSubmitButton = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => _submitGiftForm()}
        style={{marginRight: 15}}>
        <Icon name="check" type="font-awesome-5" />
      </TouchableOpacity>
    );
  }, [_submitGiftForm]);

  const _submitGiftDeletion = useCallback(() => {
    const {gift} = route.params;
    if (gift) {
      Alert.alert(
        `Suppression de ${gift.title}`,
        `Êtes-vous certain de vouloir supprimer ${gift.title} ?`,
        [
          {
            text: 'ANNULER',
            onPress: () => console.log('Cancel'),
          },
          {
            text: 'OUI',
            onPress: async () => {
              await dispatch(removeGift(gift));
              navigation.goBack();
            },
          },
        ],
      );
    }
  }, [dispatch, navigation, route.params]);

  const renderDeleteSubmitButton = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => _submitGiftDeletion()}
        style={{marginRight: 15}}>
        <Icon name="trash" type="font-awesome-5" />
      </TouchableOpacity>
    );
  }, [_submitGiftDeletion]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row-reverse'}}>
          {renderAddSubmitButton()}
          {!route.params.addMode && renderDeleteSubmitButton()}
        </View>
      ),
    });
  }, [
    _submitGiftForm,
    navigation,
    renderAddSubmitButton,
    renderDeleteSubmitButton,
    route.params.addMode,
  ]);

  return (
    <Content>
      <Form style={styles.form}>
        <Item regular style={styles.inputItem}>
          <Input
            onChangeText={(text) => setGiftForm({...giftForm, title: text})}
            value={giftForm.title}
            placeholder={'Nom du cadeau'}
          />
        </Item>

        <Item picker style={styles.inputItem}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Destinataire"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={giftForm.personKey}
            onValueChange={(value) => {
              setGiftForm({...giftForm, personKey: value});
            }}>
            {knownPersons.map(({key, name}, itemIndex) => (
              <Picker.Item key={itemIndex} label={name} value={key} />
            ))}
          </Picker>
        </Item>
        <Item regular style={styles.inputItem}>
          <Input
            onChangeText={(text) => setGiftForm({...giftForm, price: text})}
            value={giftForm.price}
            placeholder={'Valeur du cadeau (facultatif)'}
            keyboardType="numeric"
          />
        </Item>
        <Item regular style={styles.inputItem}>
          <Input
            onChangeText={(text) => setGiftForm({...giftForm, notes: text})}
            value={giftForm.notes}
            placeholder={'Notes (facultatif)'}
          />
        </Item>
        <Item picker style={styles.inputItem}>
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

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 350,
  },
  inputItem: {
    backgroundColor: 'white',
    width: '85%',
    elevation: 8,
  },
});

export default FormGift;
