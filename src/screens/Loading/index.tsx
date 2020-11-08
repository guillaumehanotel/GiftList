import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {setIsLoaded, setUser} from 'store/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import {RootState} from 'store';

GoogleSignin.configure({
  webClientId:
    '985593088284-kfvd5t6lhune0dd6jtm1m8jpfaj4l4a2.apps.googleusercontent.com',
});

const Loading = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const isConnected = await GoogleSignin.isSignedIn();
      if (isConnected) {
        if (user == null) {
          const currentUser = (await GoogleSignin.getCurrentUser()) as User;
          dispatch(setUser(currentUser));
        } else {
          dispatch(setIsLoaded(false));
        }
      } else {
        dispatch(setIsLoaded(false));
      }
    })();
  });

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#ff0000" />
    </View>
  );
};

export default Loading;
