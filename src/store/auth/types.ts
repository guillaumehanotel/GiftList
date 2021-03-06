import {User} from '@react-native-community/google-signin';

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';

export interface AuthState {
  user: User | null;
  isLoaded: boolean;
}

interface SetUserAction {
  type: typeof SET_USER;
  user: User | null;
}

interface SetIsLoadedAction {
  type: typeof SET_LOADING;
  isLoaded: boolean;
}

export type AuthActionTypes = SetIsLoadedAction | SetUserAction;
