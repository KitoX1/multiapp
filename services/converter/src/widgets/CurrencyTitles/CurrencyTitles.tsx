import { memo, useEffect, useState } from 'react';

import { ConvertedCurrency, CurrencyToConvert } from '@/entities';
import { currenciesList } from '@/shared/consts';
import { getCurrencyRates } from './utils';
import { convertToCurrencyFormat } from '@/shared/utils';

interface Props {
  fromCurrency: AnyCurrencyValue;
  toCurrency: AnyCurrencyValue;
}

const nonBreakingSpace = <>&nbsp;</>;

export const CurrencyTitles = memo(({ fromCurrency = 'usd', toCurrency = 'rub' }: Props) => {
  const [currencyRates, setCurrencyRates] = useState<Record<AnyCurrencyValue, number> | null>(null);

  useEffect(() => {
    const newCurrencyRates = getCurrencyRates(fromCurrency);

    if (newCurrencyRates) setCurrencyRates(newCurrencyRates);
  }, [fromCurrency]);

  return (
    <>
      <CurrencyToConvert>
        {1}
        {nonBreakingSpace}
        {currenciesList.find((currency) => currency.value === fromCurrency)?.name}
        {nonBreakingSpace}
        равно
      </CurrencyToConvert>

      <ConvertedCurrency>
        {currencyRates?.[`${toCurrency}`] ? convertToCurrencyFormat(currencyRates?.[`${toCurrency}`]) : 1}
        {nonBreakingSpace}
        {currenciesList.find((currency) => currency.value === toCurrency)?.name}
      </ConvertedCurrency>
    </>
  );
});
