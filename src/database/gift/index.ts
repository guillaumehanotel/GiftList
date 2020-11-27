import {User} from '@react-native-community/google-signin';
import {Gift, GiftForm} from 'screens/gift';
import database from '@react-native-firebase/database';
import {Person} from 'screens/person';
import {toInt} from 'helpers';

export const getUserGiftsByYear = async (
  {user}: User,
  year: number,
): Promise<Gift[]> => {
  const gifts = [];
  const userGiftList = (
    await database().ref(`/users/${user?.id}/gifts`).once('value')
  ).val();
  if (userGiftList !== null) {
    const userGiftKeyList = Object.keys(userGiftList);
    for (let key of userGiftKeyList) {
      const giftRef = await database()
        .ref(`/gifts/${year}/${key}`)
        .once('value');
      if (giftRef.exists()) {
        const gift = giftRef.val();
        gifts.push({
          key: key,
          ...gift,
        });
      }
    }
  }
  return gifts;
};

export const saveGiftDatabase = async (
  user: User,
  year: number,
  giftForm: GiftForm,
): Promise<string> => {
  const newGiftReference = await database()
    .ref(`/gifts/${year}`)
    .push({
      title: giftForm.title,
      price: toInt(giftForm.price),
      person: giftForm.personKey,
      notes: giftForm.notes,
      state: giftForm.state,
    });
  const newGiftKey = newGiftReference.key as string;
  await associateGiftToUser(user, newGiftKey);
  await associateGiftToPerson(giftForm.personKey, newGiftKey);
  return newGiftKey;
};

export const associateGiftToUser = async ({user}: User, newGiftKey: string) => {
  const existingGifts = (
    await database().ref(`users/${user?.id}/gifts`).once('value')
  ).val();

  await database()
    .ref(`/users/${user?.id}/gifts`)
    .set({
      ...existingGifts,
      // @ts-ignore
      [newGiftKey]: true,
    });
};

export const associateGiftToPerson = async (
  personKey: string,
  newGiftKey: string,
) => {
  let existingAttributedGifts = (
    await database().ref(`persons/${personKey}/attributedGifts`).once('value')
  ).val();

  if (existingAttributedGifts === null) {
    existingAttributedGifts = {};
  }

  await database()
    .ref(`persons/${personKey}/attributedGifts`)
    .set({
      ...existingAttributedGifts,
      [newGiftKey]: true,
    });
};

export const updateGiftDatabase = async (gift: Gift, year: number) => {
  await database().ref(`/gifts/${year}/${gift.key}`).update({
    title: gift.title,
    notes: gift.notes,
    state: gift.state,
    person: gift.personKey,
    price: gift.price,
  });
};

export const removeGiftDatabase = async (
  {user}: User,
  gift: Gift,
  year: number,
) => {
  await database().ref(`/gifts/${year}/${gift.key}`).remove();
  await database().ref(`/users/${user.id}/gifts/${gift.key}`).remove();
  await database()
    .ref(`/persons/${gift.personKey}/attributedGifts/${gift.key}`)
    .remove();
};

export const filterGiftsByUserPerson = (gifts: Gift[], person: Person) => {
  const personGifts: Gift[] = [];
  if (person.attributedGifts) {
    personGifts.push(
      ...gifts.filter((gift: Gift) => gift.personKey === person.key),
    );
  }
  return personGifts;
};
