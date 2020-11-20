import {User} from '@react-native-community/google-signin';
import {Person, PersonForm} from 'screens/person';
import database from '@react-native-firebase/database';
import {toInt} from 'helpers';
import {Gift} from 'screens/gift';
import {getYears} from 'database/year';

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

export const savePersonDatabase = async (
  user: User,
  personForm: PersonForm,
): Promise<string> => {
  const newPersonReference = await database()
    .ref('/persons')
    .push({
      name: personForm.name,
      budget: toInt(personForm.budget),
      icon: personForm.icon,
    });
  const newPersonKey = newPersonReference.key as string;
  await associatePersonToUser(user, newPersonKey);
  return newPersonKey;
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

export const updatePersonDatabase = async (person: Person) => {
  await database().ref(`/persons/${person.key}`).update({
    name: person.name,
    budget: person.budget,
    icon: person.icon,
  });
};

/**
 * Supprime une personne en DB
 * Supprime son lien avec le user et supprime tout ses cadeaux
 */
export const removePersonDatabase = async ({user}: User, person: Person) => {
  await database().ref(`/persons/${person.key}`).remove();
  await database().ref(`/users/${user.id}/persons/${person.key}`).remove();
  const years = await getYears();
  for (let year of years) {
    for (let giftKey in person.attributedGifts) {
      await database().ref(`/gifts/${year}/${giftKey}`).remove();
    }
  }
};
