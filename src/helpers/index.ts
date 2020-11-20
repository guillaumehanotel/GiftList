export const rand = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

export const toInt = (string: string) =>
  string === '' ? 0 : parseInt(string, 10);

export const toString = (number: number) =>
  number === 0 ? '' : number.toString();
