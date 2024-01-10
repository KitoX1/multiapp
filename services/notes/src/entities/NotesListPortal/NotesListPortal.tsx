import { MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Portal from '@mui/material/Portal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './NotesListPortal.module.scss';

interface Props {
  open: boolean;
  onClose: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onAgree: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => Promise<void>;
  container: Element;
}

export const NotesListPortal = ({ open, onClose, onAgree, container }: Props) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {open ? (
      <Portal container={container}>
        <Dialog
          open={open}
          onClose={onClose}
          className={styles.notesListPortal}
        >
          <DialogTitle>Удалить заметку?</DialogTitle>

          <DialogActions>
            <Button onClick={onClose}>Нет</Button>

            <Button
              onClick={onAgree}
              autoFocus
              color='error'
            >
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    ) : null}
  </>
);
