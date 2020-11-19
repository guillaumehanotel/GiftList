import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {login} from 'store/auth/actions';

GoogleSignin.configure({
  webClientId:
    '985593088284-kfvd5t6lhune0dd6jtm1m8jpfaj4l4a2.apps.googleusercontent.com',
});

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const _onGoogleButtonPress = async () => {
    await dispatch(login());
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
