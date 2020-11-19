import {Person} from 'screens/person';

export const SET_PERSONS = 'SET_PERSONS';
export const ADD_PERSON = 'ADD_PERSON';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';

export interface PersonState {
  persons: Person[];
}

interface SetPersonsAction {
  type: typeof SET_PERSONS;
  persons: Person[];
}

interface AddPersonAction {
  type: typeof ADD_PERSON;
  person: Person;
}

interface UpdatePersonAction {
  type: typeof UPDATE_PERSON;
  person: Person;
}

interface DeletePersonAction {
  type: typeof DELETE_PERSON;
  person: Person;
}

export type PersonActionTypes =
  | SetPersonsAction
  | AddPersonAction
  | UpdatePersonAction
  | DeletePersonAction;
