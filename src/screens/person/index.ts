export interface PersonForm {
  name: string;
  budget: string;
  icon: string;
}

export interface Person {
  key: string;
  name: string;
  budget: number;
  icon: string;
  attributedGifts?: object;
}

export type ParamPersonForm = {
  FormPerson: {
    avatar: string;
    addMode: boolean;
    person?: Person;
  };
};
