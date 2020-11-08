import {
  AuthActionTypes,
  AuthState,
  LOGOUT,
  SET_LOADING,
  SET_USER,
} from 'store/auth/types';

const initialState: AuthState = {
  user: null,
  isLoaded: true,
};

export const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoaded: action.isLoaded,
      };
    default:
      return state;
  }
};
