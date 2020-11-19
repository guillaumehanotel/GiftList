import {AuthActionTypes, SET_LOADING, SET_USER} from './types';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import auth from '@react-native-firebase/auth';
import {getUserById, storeUser} from 'database/user';
import {fetchPersons} from 'store/person/actions';
import {setYear} from 'store/year/actions';
import {fetchGiftsByYear} from 'store/gift/actions';

export function login(): ThunkAction<any, any, any, any> {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
    await auth().signInWithCredential(googleCredential);
    await dispatch(setUser(user));
    await dispatch(getOrRegisterUserFromDatabase(user));
  };
}

export function getOrRegisterUserFromDatabase(
  userCredential: User,
): ThunkAction<any, any, any, any> {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    let storedUser = await getUserById(userCredential.user.id);
    let selectedYear = new Date().getFullYear();
    if (!storedUser.exists()) {
      await storeUser(userCredential, selectedYear);
    } else {
      selectedYear = storedUser.child('selectedYear').val();
      await dispatch(fetchPersons(userCredential));
      await dispatch(fetchGiftsByYear(userCredential, selectedYear));
    }
    await dispatch(setYear(selectedYear));
  };
}

export function fetchLoggedUser(): ThunkAction<any, any, any, any> {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const authUser = (await GoogleSignin.getCurrentUser()) as User;
    dispatch(setUser(authUser));
  };
}

export function setUser(user: User | null): AuthActionTypes {
  return {
    type: SET_USER,
    user: user,
  };
}

export function logout(): ThunkAction<any, any, any, any> {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    await GoogleSignin.signOut();
    dispatch(setUser(null));
  };
}

export function setIsLoaded(isLoaded: boolean): AuthActionTypes {
  return {
    type: SET_LOADING,
    isLoaded: isLoaded,
  };
}
