import { useEffect, useState } from 'react';

import { CurrencyInput } from '@/entities';
import { CurrencyConvertertService } from './api';
import { cacheCurrencyRates, checkAreRatesCached } from './utils';
import { convertToCurrencyFormat } from '@/shared/utils';

interface Props {
  fromCurrencyCount: number;
  setFromCurrencyCount: React.Dispatch<React.SetStateAction<number>>;
  fromCurrency: AnyCurrencyValue;
  setFromCurrency: React.Dispatch<React.SetStateAction<AnyCurrencyValue>>;
  toCurrencyCount: number;
  setToCurrencyCount: React.Dispatch<React.SetStateAction<number>>;
  toCurrency: AnyCurrencyValue;
  setToCurrency: React.Dispatch<React.SetStateAction<AnyCurrencyValue>>;
}

export const CurrencyConverter = ({
  fromCurrencyCount,
  setFromCurrencyCount,
  fromCurrency,
  setFromCurrency,
  toCurrencyCount,
  setToCurrencyCount,
  toCurrency,
  setToCurrency,
}: Props) => {
  const [currentCurrencyRates, setCurrentCurrencyRates] = useState<Record<AnyCurrencyValue, number> | null>(null);
  const [latestDate, setLatesDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeFromCurrencyCount = (value: number) => {
    setFromCurrencyCount(value);
    setToCurrencyCount(convertToCurrencyFormat(currentCurrencyRates[`${toCurrency}`] * value));
  };

  const onChangeFromCurrency = async (currency: AnyCurrencyValue) => {
    try {
      setLoading(true);

      const cachedRates = checkAreRatesCached(currency, latestDate);

      if (cachedRates) {
        setCurrentCurrencyRates(cachedRates);
        setFromCurrency(currency);
        setToCurrencyCount(convertToCurrencyFormat(cachedRates[`${toCurrency}`] * fromCurrencyCount));
      } else {
        const newCurrencyRates = await CurrencyConvertertService.getСurrentCurrencyRate(currency);

        setCurrentCurrencyRates(newCurrencyRates[`${currency}`]);
        setLatesDate(newCurrencyRates.date);
        cacheCurrencyRates(currency, newCurrencyRates);

        setFromCurrency(currency);
        setToCurrencyCount(
          convertToCurrencyFormat(newCurrencyRates[`${currency}`][`${toCurrency}`] * fromCurrencyCount),
        );
      }
    } catch (error) {
      console.log(error); // @TODO: notification
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onChangeToCurrency = (currency: AnyCurrencyValue) => {
    setToCurrency(currency);
    setToCurrencyCount(convertToCurrencyFormat(currentCurrencyRates[`${currency}`] * fromCurrencyCount));
  };

  const onChangeToCurrencyCount = (value: number) => {
    setToCurrencyCount(value);
    setFromCurrencyCount(convertToCurrencyFormat(value / currentCurrencyRates[`${toCurrency}`]));
  };

  useEffect(() => {
    onChangeFromCurrency(fromCurrency);
  }, []);

  return (
    <div>
      <CurrencyInput
        count={fromCurrencyCount}
        onChangeCount={onChangeFromCurrencyCount}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency}
        disabled={loading}
      />

      <CurrencyInput
        count={toCurrencyCount}
        onChangeCount={onChangeToCurrencyCount}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency}
        disabled={loading}
      />
    </div>
  );
};
