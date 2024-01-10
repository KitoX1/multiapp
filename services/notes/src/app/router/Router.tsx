import { Navigate, createBrowserRouter } from 'react-router-dom';
import { notesRoutes } from '@packages/shared';

import { NotesListPage, NotePage } from '@/pages';

const routes = [
  {
    path: notesRoutes.notes,
    element: <NotesListPage />,
  },
  {
    path: notesRoutes.note,
    element: <NotePage />,
  },
  {
    path: notesRoutes[404],
    element: (
      <Navigate
        to={notesRoutes.notes}
        replace
      />
    ),
  },
];

export const router = createBrowserRouter(routes);

export default routes;
