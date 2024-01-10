export const cacheCurrencyRates = (
  currency: AnyCurrencyValue,
  data: { date: string } & { [key in AnyCurrencyValue]: { [childKey in AnyCurrencyValue]: number } },
) => {
  localStorage.setItem(`${currency}Rates`, JSON.stringify(data));
};

export const checkAreRatesCached = (currency: AnyCurrencyValue, date: string) => {
  const cachedRates = JSON.parse(localStorage.getItem(`${currency}Rates`));

  if (cachedRates?.date === date) return cachedRates[`${currency}`];
  return null;
};
