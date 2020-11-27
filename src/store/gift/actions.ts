import {User} from '@react-native-community/google-signin';
import {ThunkDispatch} from 'redux-thunk';
import {getUserGiftsByYear, saveGiftDatabase} from 'database';
import {Gift, GiftForm} from 'screens/gift';
import {
  ADD_GIFT,
  DELETE_GIFT,
  GiftActionTypes,
  SET_GIFTS,
  UPDATE_GIFT,
} from 'store/gift/types';
import {toInt} from 'helpers';
import {removeGiftDatabase, updateGiftDatabase} from 'database/gift';

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

export function saveGift(user: User, year: number, giftForm: GiftForm) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const newGiftKey = await saveGiftDatabase(user, year, giftForm);
    const gift: Gift = {
      key: newGiftKey,
      title: giftForm.title,
      notes: giftForm.notes,
      state: giftForm.state,
      personKey: giftForm.personKey,
      price: toInt(giftForm.price),
    };
    dispatch(addGift(gift));
  };
}

export function addGift(gift: Gift): GiftActionTypes {
  return {
    type: ADD_GIFT,
    gift: gift,
  };
}

export function updateGift(gift: Gift, giftForm: GiftForm, year: number) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const updatedgift = {
      ...gift,
      title: giftForm.title,
      notes: giftForm.notes,
      state: giftForm.state,
      person: giftForm.personKey,
      price: toInt(giftForm.price),
    };
    await updateGiftDatabase(updatedgift, year);
    dispatch(editGift(updatedgift));
  };
}

export function editGift(gift: Gift): GiftActionTypes {
  return {
    type: UPDATE_GIFT,
    gift: gift,
  };
}

export function removeGift(gift: Gift) {
  return async (dispatch: ThunkDispatch<any, any, any>, getState: any) => {
    const user: User = getState().auth.user;
    const year: number = getState().year.year;
    await removeGiftDatabase(user, gift, year);
    dispatch(deleteGift(gift));
  };
}

export function deleteGift(gift: Gift): GiftActionTypes {
  return {
    type: DELETE_GIFT,
    gift: gift,
  };
}
