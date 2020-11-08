import {AuthActionTypes, LOGOUT, SET_LOADING, SET_USER} from './types';
import {User} from '@react-native-community/google-signin';

export function setUser(user: User): AuthActionTypes {
  return {
    type: SET_USER,
    user: user,
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}

export function setIsLoaded(isLoaded: boolean): AuthActionTypes {
  return {
    type: SET_LOADING,
    isLoaded: isLoaded,
  };
}
