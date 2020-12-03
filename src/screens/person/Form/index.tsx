import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Content, Form, Input, Item, Toast} from 'native-base';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {PersonForm, ParamPersonForm} from 'screens/person';
import {User} from '@react-native-community/google-signin';
import images from 'assets';
import {rand, toString} from 'helpers';
import {removePerson, savePerson, updatePerson} from 'store/person/actions';

const FormPerson = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const [personForm, setPersonForm] = useState<PersonForm>({
    name: '',
    budget: '',
    icon: `xmas_icon_${rand(1, 12)}`,
  });
  const [formError, setFormError] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamPersonForm, 'FormPerson'>>();
  const dispatch = useDispatch();

  /**
   * Remplis le formulaire si on est en mode Edition
   **/
  useEffect(() => {
    if (route.params && !route.params.addMode) {
      const {person} = route.params;
      if (person !== undefined) {
        setPersonForm({
          name: person.name,
          budget: toString(person.budget),
          icon: person.icon,
        });
      }
    }
  }, [route.params]);

  /**
   * Mets à jour l'avatar si un nouveau est choisi via les paramètres reçu
   * et permets de retrouver les valeurs du formulaire qui ont été sauvegardé temporairement dans l'asyncStorage
   * avant de passer au screen de choix d'avatar
   **/
  useEffect(() => {
    (async () => {
      if (route.params && route.params.avatar) {
        const avatar = route.params.avatar;
        const tmpPersonForm = await AsyncStorage.getItem('personForm');
        if (tmpPersonForm !== null) {
          const tmpJsonPersonForm = JSON.parse(tmpPersonForm);
          setPersonForm({
            icon: avatar,
            name: tmpJsonPersonForm.name,
            budget: tmpJsonPersonForm.budget,
          });
        }
        await AsyncStorage.removeItem('personForm');
      }
    })();
  }, [route.params]);

  const _submitPersonForm = useCallback(async () => {
    if (personForm.name) {
      if (route.params.addMode) {
        await dispatch(savePerson(user, personForm));
      } else {
        const {person} = route.params;
        if (person !== undefined) {
          await dispatch(updatePerson(person, personForm));
        }
      }
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
  }, [personForm, route.params, navigation, dispatch, user]);

  const _submitPersonDeletion = useCallback(async () => {
    const {person} = route.params;
    if (person) {
      Alert.alert(
        `Suppression de ${person.name}`,
        `Êtes-vous certain de vouloir supprimer ${person.name} ainsi que tous ses cadeaux ?`,
        [
          {
            text: 'ANNULER',
            onPress: () => console.log('Cancel'),
          },
          {
            text: 'OUI',
            onPress: async () => {
              await dispatch(removePerson(person));
              navigation.goBack();
            },
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }, [dispatch, navigation, route.params]);

  const renderAddSubmitButton = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => _submitPersonForm()}
        style={{marginRight: 15}}>
        <Icon name="check" type="font-awesome-5" />
      </TouchableOpacity>
    );
  }, [_submitPersonForm]);

  const renderDeleteSubmitButton = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => _submitPersonDeletion()}
        style={{marginRight: 15}}>
        <Icon name="trash" type="font-awesome-5" />
      </TouchableOpacity>
    );
  }, [_submitPersonDeletion]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        (route.params.addMode ? 'Ajouter' : 'Éditer') + ' une personne',
      headerRight: () => (
        <View style={{flexDirection: 'row-reverse'}}>
          {renderAddSubmitButton()}
          {!route.params.addMode && renderDeleteSubmitButton()}
        </View>
      ),
    });
  }, [
    _submitPersonForm,
    navigation,
    renderAddSubmitButton,
    renderDeleteSubmitButton,
    route.params.addMode,
  ]);

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
            onPress={async () => {
              try {
                await AsyncStorage.setItem(
                  'personForm',
                  JSON.stringify(personForm),
                );
              } catch (e) {
                console.log(e);
              }
              navigation.navigate('ChooseAvatar');
            }}>
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

export default FormPerson;
