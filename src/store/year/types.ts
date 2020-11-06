export const SET_YEAR = 'SET_YEAR';

export interface YearState {
  year: number;
}

interface SetYearAction {
  type: typeof SET_YEAR;
  year: number;
}

export type YearActionTypes = SetYearAction;
