import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { currenciesList } from '@/shared/consts';

import styles from './CurrencyInput.module.scss';

interface Props {
  count: number;
  onChangeCount: (value: number) => void;
  currency: AnyCurrencyValue;
  onChangeCurrency: (currency: AnyCurrencyValue) => void;
  disabled?: boolean;
}

export const CurrencyInput = ({ count, onChangeCount, currency, onChangeCurrency, disabled }: Props) => (
  <div className={styles.currencyInput}>
    <Input
      value={count}
      onChange={({ target }) => onChangeCount(+target.value)}
      disabled={disabled}
    />

    <Select
      value={currency}
      onChange={({ target }) => onChangeCurrency(target.value as AnyCurrencyValue)}
      disabled={disabled}
      variant='standard'
    >
      {currenciesList.map((currencyItem) => (
        <MenuItem
          value={currencyItem.value}
          key={currencyItem.value}
        >
          {currencyItem.name}
        </MenuItem>
      ))}
    </Select>
  </div>
);
