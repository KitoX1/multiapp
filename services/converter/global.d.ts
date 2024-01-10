declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare interface Currencies {
  AED: 'aed';
  AMD: 'amd';
  ARS: 'ars';
  BRL: 'brl';
  CNY: 'cny';
  EUR: 'eur';
  GEL: 'gel';
  GBP: 'gbp';
  JPY: 'jpy';
  KRW: 'krw';
  KZT: 'kzt';
  RUB: 'rub';
  USD: 'usd';
}

declare type AnyCurrencyValue = Currencies[keyof Currencies];
