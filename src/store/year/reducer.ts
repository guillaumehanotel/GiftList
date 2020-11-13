import {YearState, YearActionTypes, SET_YEAR} from '@store/year/types';

const initialState: YearState = {
  year: 0,
};

export const yearReducer = (state = initialState, action: YearActionTypes) => {
  switch (action.type) {
    case SET_YEAR:
      return {
        ...state,
        year: action.year,
      };
    default:
      return state;
  }
};
