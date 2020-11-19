import {GiftActionTypes, GiftState, SET_GIFTS} from 'store/gift/types';

const initialState: GiftState = {
  gifts: [],
};

export const giftReducer = (state = initialState, action: GiftActionTypes) => {
  switch (action.type) {
    case SET_GIFTS:
      return {
        ...state,
        gifts: action.gifts,
      };
    default:
      return state;
  }
};
