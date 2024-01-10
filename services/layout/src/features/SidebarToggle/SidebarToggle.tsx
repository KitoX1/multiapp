import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './SidebarToggle.module.scss';
import { useSidebarContext } from '@/pages';

interface Props {
  display?: boolean;
}

export const SidebarToggle = ({ display = false }: Props) => {
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {display && (
        <IconButton
          className={styles.sidebarToggle}
          onClick={() => setIsSidebarOpened((prev) => !prev)}
        >
          {isSidebarOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      )}
    </>
  );
};
