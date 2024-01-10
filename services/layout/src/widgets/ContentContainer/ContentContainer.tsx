import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import styles from './ContentContainer.module.scss';

export const ContentContainer = memo(() => (
  <Box
    component='main'
    className={styles.contentContainer}
  >
    <Outlet />
  </Box>
));
