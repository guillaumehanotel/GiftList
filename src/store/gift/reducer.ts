import {
  ADD_GIFT,
  DELETE_GIFT,
  GiftActionTypes,
  GiftState,
  SET_GIFTS,
  UPDATE_GIFT,
} from 'store/gift/types';
import {Gift} from 'screens/gift';

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
    case ADD_GIFT:
      return {
        ...state,
        gifts: [...state.gifts, action.gift],
      };
    case UPDATE_GIFT:
      let gift = action.gift;
      let clone = JSON.parse(JSON.stringify(state.gifts));
      const index = clone.findIndex((obj: Gift) => obj.key === gift.key);
      if (index !== -1) {
        clone[index] = gift;
      }
      return {
        ...state,
        gifts: clone,
      };
    case DELETE_GIFT:
      return {
        ...state,
        gifts: state.gifts.filter((gift) => gift !== action.gift),
      };
    default:
      return state;
  }
};
