import {Gift} from 'screens/gift';

export const SET_GIFTS = 'SET_GIFTS';

export interface GiftState {
  gifts: Gift[];
}

interface SetGiftsAction {
  type: typeof SET_GIFTS;
  gifts: Gift[];
}

export type GiftActionTypes = SetGiftsAction;
