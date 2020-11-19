import React, {useCallback, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {fetchLoggedUser, setIsLoaded} from 'store/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import {RootState} from 'store';
import {fetchYear} from 'store/year/actions';
import {fetchPersons} from 'store/person/actions';
import {Person} from 'screens/person';
import {fetchGiftsByYear} from 'store/gift/actions';

GoogleSignin.configure({
  webClientId:
    '985593088284-kfvd5t6lhune0dd6jtm1m8jpfaj4l4a2.apps.googleusercontent.com',
});

const Loading = () => {
  const stateUser: User | null = useSelector(
    (state: RootState) => state.auth.user,
  );
  const year: number | null = useSelector(
    (state: RootState) => state.year.year,
  );
  const persons: Person[] | null = useSelector(
    (state: RootState) => state.person.persons,
  );
  const dispatch = useDispatch();

  const _fetchData = useCallback(async () => {
    if (stateUser) {
      dispatch(fetchYear(stateUser));
      dispatch(fetchPersons(stateUser));
      dispatch(fetchGiftsByYear(stateUser, year));
    }
  }, [dispatch, stateUser, year]);

  const _areDataReady = useCallback(() => stateUser && year && persons, [
    persons,
    stateUser,
    year,
  ]);

  useEffect(() => {
    (async () => {
      const isConnected = await GoogleSignin.isSignedIn();
      if (isConnected) {
        if (stateUser === null) {
          dispatch(fetchLoggedUser());
        }
        await _fetchData();
        if (_areDataReady()) {
          dispatch(setIsLoaded(true));
        }
      } else {
        // Redirection vers login
        dispatch(setIsLoaded(true));
      }
    })();
  }, [dispatch, year, persons, stateUser, _fetchData, _areDataReady]);

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
