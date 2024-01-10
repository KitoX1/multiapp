import styles from './CurrencyToConvert.module.scss';

interface Props {
  children: React.ReactNode;
}

export const CurrencyToConvert = ({ children }: Props) => <p className={styles.currencyToConvert}>{children}</p>;
