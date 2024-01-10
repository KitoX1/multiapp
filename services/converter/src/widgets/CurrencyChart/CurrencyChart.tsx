import { memo, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { LineChart } from '@mui/x-charts/LineChart';

import { CurrencyChartService } from './api';
import { datesToFetch } from './consts';
import { cachePoints, checkArePointsCached } from './utils';

interface Props {
  fromCurrency: AnyCurrencyValue;
  toCurrency: AnyCurrencyValue;
}

interface Point {
  date: string;
  value: number;
}

export const CurrencyChart = memo(({ fromCurrency, toCurrency }: Props) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPoints = async () => {
    try {
      setLoading(true);

      const cachedPoints = checkArePointsCached(fromCurrency, toCurrency, datesToFetch.at(-1));

      if (cachedPoints) {
        setPoints(cachedPoints);
      } else {
        await Promise.allSettled(
          datesToFetch.map((date) => CurrencyChartService.getCurrencyByDate(fromCurrency, toCurrency, date)),
        ).then((responses) => {
          const newPoints: Point[] = [];

          responses.forEach((response, index) => {
            if (response?.status === 'fulfilled') {
              newPoints.push({ date: datesToFetch[index], value: response?.value });
            }
          });

          setPoints(newPoints);
          cachePoints(fromCurrency, toCurrency, datesToFetch.at(-1), newPoints);
        });
      }
    } catch (error) {
      console.log(error); // @TODO: notification
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPoints();
  }, [fromCurrency, toCurrency]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <LineChart
          width={500}
          height={300}
          series={[{ data: points.map((point) => point?.value), area: true }]}
          xAxis={[{ scaleType: 'point', data: points.map((point) => point?.date) }]}
        />
      )}
    </>
  );
});
