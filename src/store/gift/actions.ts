import {User} from '@react-native-community/google-signin';
import {ThunkDispatch} from 'redux-thunk';
import {getUserGiftsByYear} from 'database';
import {Gift} from 'screens/gift';
import {GiftActionTypes, SET_GIFTS} from 'store/gift/types';

export function fetchGiftsByYear(user: User, year: number) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const gifts = await getUserGiftsByYear(user, year);
    dispatch(setGifts(gifts));
  };
}

export function setGifts(gifts: Gift[]): GiftActionTypes {
  return {
    type: SET_GIFTS,
    gifts: gifts,
  };
}
