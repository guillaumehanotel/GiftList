import {Person, PersonForm} from 'screens/person';
import {ADD_PERSON, PersonActionTypes, SET_PERSONS} from 'store/person/types';
import {User} from '@react-native-community/google-signin';
import {ThunkDispatch} from 'redux-thunk';
import {getPersons, storePerson} from 'database';
import {toInt} from 'helpers';

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
    const newPersonKey = await storePerson(user, personForm);
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
