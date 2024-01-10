import { createContext, useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';

import { ContentContainer, LayoutHeader, Sidebar } from '@/widgets';

const sidebarWidth = 240;

const SidebarContext = createContext<SidebarContextType>(null);
export const useSidebarContext = () => useContext(SidebarContext);

const LayoutPage = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);

  const sidebar = useMemo(() => ({ isSidebarOpened, setIsSidebarOpened }), [isSidebarOpened]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarContext.Provider value={sidebar}>
        <LayoutHeader />

        <Sidebar width={sidebarWidth} />
      </SidebarContext.Provider>

      <ContentContainer />
    </Box>
  );
};

export default LayoutPage;
