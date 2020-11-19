import {
  ADD_PERSON,
  DELETE_PERSON,
  PersonActionTypes,
  PersonState,
  SET_PERSONS,
  UPDATE_PERSON,
} from 'store/person/types';
import {Person} from 'screens/person';

const initialState: PersonState = {
  persons: [],
};

export const personReducer = (
  state = initialState,
  action: PersonActionTypes,
) => {
  switch (action.type) {
    case SET_PERSONS:
      return {
        ...state,
        persons: action.persons,
      };
    case ADD_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.person],
      };
    case UPDATE_PERSON:
      let person = action.person;
      let clone = JSON.parse(JSON.stringify(state.persons));
      const index = clone.findIndex((obj: Person) => obj.key === person.key);
      if (index !== 1) {
        clone[index] = person;
      }
      return {
        ...state,
        persons: clone,
      };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter((person) => person !== action.person),
      };
    default:
      return state;
  }
};
