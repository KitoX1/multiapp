export const getCurrencyRates = (currency: AnyCurrencyValue) => {
  const rates = JSON.parse(localStorage.getItem(`${currency}Rates`));

  if (rates) return rates[`${currency}`];
  return null;
};
