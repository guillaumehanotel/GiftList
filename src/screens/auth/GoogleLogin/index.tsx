import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {setUser} from 'store/auth/actions';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {setYear} from 'store/year/actions';

GoogleSignin.configure({
  webClientId:
    '985593088284-kfvd5t6lhune0dd6jtm1m8jpfaj4l4a2.apps.googleusercontent.com',
});

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const _getOrSaveUserFromDatabase = async (userCredential: User) => {
    // TODO : refactor in DB
    const storedUser = await database()
      .ref('/users/' + userCredential.user.id)
      .once('value' as FirebaseDatabaseTypes.EventType);
    let selectedYear = new Date().getFullYear();
    if (!storedUser.exists()) {
      await database()
        .ref('/users/' + userCredential.user.id)
        .set({
          name: userCredential.user.name,
          email: userCredential.user.email,
          selectedYear: selectedYear,
        });
    } else {
      selectedYear = storedUser.child('selectedYear').val();
    }
    dispatch(setYear(selectedYear));
  };

  const _onGoogleButtonPress = async () => {
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
    dispatch(setUser(user));
    await _getOrSaveUserFromDatabase(user);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.login}>
      <Button title="Google Sign-In" onPress={() => _onGoogleButtonPress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});


export default GoogleLogin;
