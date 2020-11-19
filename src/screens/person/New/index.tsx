import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Content, Form, Input, Item, Toast} from 'native-base';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {PersonForm} from 'screens/person';
import {User} from '@react-native-community/google-signin';
import images from 'assets';
import {rand} from 'helpers';
import {savePerson} from 'store/person/actions';

type ParamAvatar = {
  ChooseAvatar: {
    avatar: string;
  };
};

const CreatePerson = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const [personForm, setPersonForm] = useState<PersonForm>({
    name: '',
    budget: '',
    icon: `xmas_icon_${rand(1, 12)}`,
  });
  const [formError, setFormError] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamAvatar, 'ChooseAvatar'>>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params && route.params.avatar) {
      const avatar = route.params.avatar;
      setPersonForm((prevState) => {
        return {...prevState, icon: avatar};
      });
    }
  }, [route.params]);

  const _submitPersonForm = useCallback(async () => {
    if (personForm.name) {
      await dispatch(savePerson(user, personForm));
      navigation.goBack();
    } else {
      setFormError(true);
      Toast.show({
        type: 'warning',
        text: 'Fill the name input !',
        buttonText: 'Okay',
        duration: 2000,
      });
    }
  }, [personForm, dispatch, user, navigation]);

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
      <Form style={styles.form}>
        <Item regular style={styles.inputItem} error={formError}>
          <Input
            onChangeText={(text) => setPersonForm({...personForm, name: text})}
            value={personForm.name}
            placeholder={'Nom de la personne'}
          />
        </Item>
        <Item regular style={styles.inputItem}>
          <Input
            keyboardType="numeric"
            onChangeText={(text) =>
              setPersonForm({...personForm, budget: text})
            }
            value={personForm.budget}
            placeholder={'Budget EUR (facultatif)'}
          />
        </Item>
        <View>
          <Text style={styles.imageText}>Appuyer pour changer la photo :</Text>
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 15}}
            onPress={() => navigation.navigate('ChooseAvatar')}>
            {/* @ts-ignore */}
            <Image source={images[personForm.icon]} style={styles.image} />
          </TouchableOpacity>
        </View>
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
  imageText: {
    fontSize: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
  },
});

export default CreatePerson;
