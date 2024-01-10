import styles from './ConvertedCurrency.module.scss';

interface Props {
  children: React.ReactNode;
}

export const ConvertedCurrency = ({ children }: Props) => <p className={styles.convertedCurrency}>{children}</p>;
