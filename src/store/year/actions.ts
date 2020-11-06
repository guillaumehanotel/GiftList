import {SET_YEAR, YearActionTypes} from './types';

export function setYear(year: number): YearActionTypes {
  return {
    type: SET_YEAR,
    year: year,
  };
}
