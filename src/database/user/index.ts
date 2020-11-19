import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {User} from '@react-native-community/google-signin';

export const getUserSelectedYear = async ({user}: User) => {
  return (
    await database()
      .ref(`/users/${user.id}/selectedYear`)
      .once('value' as FirebaseDatabaseTypes.EventType)
  ).val();
};

export const getUserById = async (id: string) => {
  return await database()
    .ref('/users/' + id)
    .once('value' as FirebaseDatabaseTypes.EventType);
};

export const storeUser = async (userCredential: User, selectedYear: number) => {
  await database()
    .ref('/users/' + userCredential.user.id)
    .set({
      name: userCredential.user.name,
      email: userCredential.user.email,
      selectedYear: selectedYear,
    });
};
