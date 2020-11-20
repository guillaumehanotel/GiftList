import {Person, PersonForm} from 'screens/person';
import {
  ADD_PERSON,
  DELETE_PERSON,
  PersonActionTypes,
  SET_PERSONS,
  UPDATE_PERSON,
} from 'store/person/types';
import {User} from '@react-native-community/google-signin';
import {ThunkDispatch} from 'redux-thunk';
import {getPersons, savePersonDatabase} from 'database';
import {toInt} from 'helpers';
import {removePersonDatabase, updatePersonDatabase} from 'database/person';

export function fetchPersons(user: User) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const persons = await getPersons(user);
    dispatch(setPersons(persons));
  };
}

export function setPersons(persons: Person[]): PersonActionTypes {
  return {
    type: SET_PERSONS,
    persons: persons,
  };
}

/**
 * Appelle 'storePerson' qui enregistre la personne en DB
 * & 'addPerson' qui ajoute la personne dans le state
 */
export function savePerson(user: User, personForm: PersonForm) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const newPersonKey = await savePersonDatabase(user, personForm);
    const person: Person = {
      key: newPersonKey,
      name: personForm.name,
      budget: toInt(personForm.budget),
      icon: personForm.icon,
    };
    dispatch(addPerson(person));
  };
}

export function addPerson(person: Person): PersonActionTypes {
  return {
    type: ADD_PERSON,
    person: person,
  };
}

export function updatePerson(person: Person, personForm: PersonForm) {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    person = {
      ...person,
      name: personForm.name,
      budget: toInt(personForm.budget),
      icon: personForm.icon,
    };
    await updatePersonDatabase(person);
    dispatch(editPerson(person));
  };
}

export function editPerson(person: Person): PersonActionTypes {
  return {
    type: UPDATE_PERSON,
    person: person,
  };
}

export function removePerson(person: Person) {
  return async (dispatch: ThunkDispatch<any, any, any>, getState: any) => {
    const user: User = getState().auth.user;
    await removePersonDatabase(user, person);
    dispatch(deletePerson(person));
  };
}

export function deletePerson(person: Person): PersonActionTypes {
  return {
    type: DELETE_PERSON,
    person: person,
  };
}
