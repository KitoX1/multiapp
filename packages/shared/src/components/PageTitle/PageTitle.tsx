import styles from './PageTitle.module.scss';

interface Props {
  children: string | React.ReactNode;
}

export const PageTitle = ({ children }: Props) => <h1 className={styles.pageTitle}>{children}</h1>;
