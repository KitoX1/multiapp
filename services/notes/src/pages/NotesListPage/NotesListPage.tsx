import { Provider } from 'react-redux';
import Box from '@mui/material/Box';
import { PageTitle } from '@packages/shared';

import { store } from '@/shared/store';
import { NotesList } from '@/widgets';
import { NotesListAddItem } from '@/features';

import styles from './NotesListPage.module.scss';

export const NotesListPage = () => (
  <Provider store={store}>
    <header className={styles.notesListPage__header}>
      <PageTitle>Заметки</PageTitle>

      <NotesListAddItem />
    </header>

    <Box>
      <NotesList />
    </Box>
  </Provider>
);
