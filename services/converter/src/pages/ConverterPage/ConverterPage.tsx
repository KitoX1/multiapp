import { useState } from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@packages/shared';

import { CurrencyChart, CurrencyConverter, CurrencyTitles } from '@/widgets';

import styles from './ConverterPage.module.scss';

export const ConverterPage = () => {
  const [fromCurrencyCount, setFromCurrencyCount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<AnyCurrencyValue>('usd');
  const [toCurrencyCount, setToCurrencyCount] = useState<number>(1);
  const [toCurrency, setToCurrency] = useState<AnyCurrencyValue>('rub');

  return (
    <>
      <PageTitle>Курс валют</PageTitle>

      <Box className={styles.converterPage__container}>
        <Box>
          <CurrencyTitles
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />

          <CurrencyConverter
            fromCurrencyCount={fromCurrencyCount}
            setFromCurrencyCount={setFromCurrencyCount}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrencyCount={toCurrencyCount}
            setToCurrencyCount={setToCurrencyCount}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
          />
        </Box>

        <Box className={styles.converterPage__chart}>
          <CurrencyChart
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </Box>
      </Box>
    </>
  );
};
