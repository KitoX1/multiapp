import { Provider } from 'react-redux';

import { NoteEditor } from '@/widgets';
import { NoteBack } from '@/features';
import { store } from '@/shared/store';

export const NotePage = () => (
  <>
    <NoteBack />

    <Provider store={store}>
      <NoteEditor />
    </Provider>
  </>
);
