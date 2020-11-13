import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {setIsLoaded, setUser} from 'store/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import {RootState} from 'store';
import {setYear} from 'store/year/actions';
import {getUserSelectedYear} from 'database/user';

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
        }
        if (user) {
          const year = await getUserSelectedYear(user);
          dispatch(setYear(year));
        }
        setTimeout(() => {
          dispatch(setIsLoaded(false));
        }, 20);
      }
    })();
  });

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#ff0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;
