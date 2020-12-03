export interface GiftForm {
  title: string;
  price: string;
  notes: string;
  personKey: string;
  state: string;
}

export interface Gift {
  key: string;
  title: string;
  price: number;
  notes: string;
  person: string;
  state: string;
}

export type ParamGiftForm = {
  FormGift: {
    addMode: boolean;
    gift?: Gift;
  };
};

export interface PersonItem {
  key: string;
  name: string;
}

export const STATES = [
  'Idée',
  'A acheter',
  'Acheté',
  'Commandé',
  'A emballer',
  'Emballé',
];
