import { Point } from './types';

export const cachePoints = (
  fromCurrency: AnyCurrencyValue,
  toCurrency: AnyCurrencyValue,
  lastDate: string,
  pointsToCache: Point[],
) => {
  localStorage.setItem(`${fromCurrency}-${toCurrency}`, JSON.stringify({ date: lastDate, points: pointsToCache }));
};

export const checkArePointsCached = (
  fromCurrency: AnyCurrencyValue,
  toCurrency: AnyCurrencyValue,
  lastDate: string,
) => {
  const cachedPoints = JSON.parse(localStorage.getItem(`${fromCurrency}-${toCurrency}`));

  if (cachedPoints?.date === lastDate) return cachedPoints.points;
  return null;
};
