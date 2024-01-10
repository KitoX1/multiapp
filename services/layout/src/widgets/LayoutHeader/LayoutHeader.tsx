import { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { SidebarToggle } from '@/features';
import { useIsMobile } from '@/shared/hooks';

export const LayoutHeader = memo(() => {
  const isMobile = useIsMobile();

  return (
    <AppBar>
      <Toolbar>
        <SidebarToggle display={isMobile} />

        <h3>Multiapp</h3>
      </Toolbar>
    </AppBar>
  );
});
