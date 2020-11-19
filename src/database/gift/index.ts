import {User} from '@react-native-community/google-signin';
import {Gift, GiftForm} from 'screens/gift';
import database from '@react-native-firebase/database';

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
      const gift = (
        await database().ref(`/gifts/${year}/${key}`).once('value')
      ).val();
      gifts.push({
        key: key,
        ...gift,
      });
    }
  }
  return gifts;
};

export const storeGift = async (
  giftForm: GiftForm,
  year: number,
): Promise<string> => {
  const newGiftReference = await database()
    .ref(`/gifts/${year}`)
    .push({
      title: giftForm.title,
      price: giftForm.price === '' ? 0 : parseInt(giftForm.price, 10),
      person: giftForm.person,
      notes: giftForm.notes,
      state: giftForm.state,
    });
  return newGiftReference.key as string;
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
