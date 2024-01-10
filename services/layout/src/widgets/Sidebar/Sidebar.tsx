import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';

import { converterRoutes, notesRoutes } from '@packages/shared';
import { MenuList } from '@/entities';
import { useIsMobile } from '@/shared/hooks';
import { useSidebarContext } from '@/pages';

import styles from './Sidebar.module.scss';

interface Props {
  width?: number;
}

const menuItems = [
  {
    name: 'Курс валют',
    icon: <CurrencyExchangeOutlinedIcon />,
    link: converterRoutes.converter,
  },
  {
    name: 'Заметки',
    icon: <NotesOutlinedIcon />,
    link: notesRoutes.notes,
  },
];

export const Sidebar = ({ width = 240 }: Props) => {
  const isMobile = useIsMobile();
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  return (
    <Drawer
      className={styles.sidebar}
      sx={{ width, '& .MuiDrawer-paper': { width } }}
      variant={isMobile ? 'temporary' : 'permanent'}
      onClose={() => setIsSidebarOpened(false)}
      anchor='left'
      open={isSidebarOpened}
    >
      <Toolbar />

      <MenuList items={menuItems} />
    </Drawer>
  );
};
