import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {User} from '@react-native-community/google-signin';

export const getUserSelectedYear = async ({user}: User) => {
  return (
    await database()
      .ref(`/users/${user.id}/selectedYear`)
      .once('value' as FirebaseDatabaseTypes.EventType)
  ).val();
};
