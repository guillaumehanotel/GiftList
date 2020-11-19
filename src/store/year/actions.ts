import {SET_YEAR, YearActionTypes} from './types';
import {ThunkDispatch} from 'redux-thunk';
import {User} from '@react-native-community/google-signin';
import {getUserSelectedYear} from 'database/user';

export function fetchYear(user: User) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const selectedYear = await getUserSelectedYear(user);
    dispatch(setYear(selectedYear));
  };
}

export function setYear(year: number): YearActionTypes {
  return {
    type: SET_YEAR,
    year: year,
  };
}
