import database from '@react-native-firebase/database';

export const getYears = async (): Promise<string[]> => {
  let years: string[] = [];
  const yearsObj = (
    await database().ref('/').child('gifts').once('value')
  ).val();
  if (yearsObj) {
    years = Object.keys(yearsObj);
  }
  return years;
};
