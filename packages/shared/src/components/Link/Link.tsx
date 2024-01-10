import { Link as RouterLink, LinkProps } from 'react-router-dom';

import styles from './Link.module.scss';

export const Link = ({ children, to }: LinkProps) => (
  <RouterLink
    className={styles.link}
    to={to}
  >
    {children}
  </RouterLink>
);
