import {User} from '@react-native-community/google-signin';
import {Person, PersonForm} from 'screens/person';
import database from '@react-native-firebase/database';

export const getPersons = async ({user}: User): Promise<Person[]> => {
  const userPersonKeyList = Object.keys(
    (await database().ref(`/users/${user?.id}/persons`).once('value')).val(),
  );
  const persons = [];
  for (let key of userPersonKeyList) {
    const person = (
      await database().ref(`/persons/${key}`).once('value')
    ).val();
    persons.push({
      key: key,
      ...person,
    });
  }
  return persons;
};

export const storePerson = async (personForm: PersonForm): Promise<string> => {
  const newPersonReference = await database()
    .ref('/persons')
    .push({
      name: personForm.name,
      budget: personForm.budget === '' ? 0 : parseInt(personForm.budget, 10),
    });
  return newPersonReference.key as string;
};

export const associatePersonToUser = async (
  {user}: User,
  newPersonKey: string,
) => {
  const existingPersons = (
    await database().ref(`users/${user?.id}/persons`).once('value')
  ).val();

  await database()
    .ref(`/users/${user?.id}/persons`)
    .set({
      ...existingPersons,
      // @ts-ignore
      [newPersonKey]: true,
    });
};
