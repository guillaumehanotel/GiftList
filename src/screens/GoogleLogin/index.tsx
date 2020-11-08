import React from 'react';
import {View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {setUser} from 'store/auth/actions';

GoogleSignin.configure({
  webClientId:
    '985593088284-kfvd5t6lhune0dd6jtm1m8jpfaj4l4a2.apps.googleusercontent.com',
});

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const _onGoogleButtonPress = async () => {
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
    dispatch(setUser(user));
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <Button title="Google Sign-In" onPress={() => _onGoogleButtonPress()} />
    </View>
  );
};

export default GoogleLogin;
