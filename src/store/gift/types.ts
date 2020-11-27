import {Gift} from 'screens/gift';

export const SET_GIFTS = 'SET_GIFTS';
export const ADD_GIFT = 'ADD_GIFT';
export const UPDATE_GIFT = 'UPDATE_GIFT';
export const DELETE_GIFT = 'DELETE_GIFT';

export interface GiftState {
  gifts: Gift[];
}

interface SetGiftsAction {
  type: typeof SET_GIFTS;
  gifts: Gift[];
}

interface AddGiftAction {
  type: typeof ADD_GIFT;
  gift: Gift;
}

interface UpdateGiftAction {
  type: typeof UPDATE_GIFT;
  gift: Gift;
}

interface DeleteGiftAction {
  type: typeof DELETE_GIFT;
  gift: Gift;
}

export type GiftActionTypes =
  | SetGiftsAction
  | AddGiftAction
  | UpdateGiftAction
  | DeleteGiftAction;
