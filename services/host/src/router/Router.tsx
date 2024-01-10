import { Navigate, createBrowserRouter } from 'react-router-dom';

// @ts-ignore
import converterRoutes from 'converter/Router';
// @ts-ignore
import notesRoutes from 'notes/Router';
// @ts-ignore
import Layout from 'layout/Layout';
import { hostRoutes } from '@packages/shared';

const routes = [
  {
    path: hostRoutes.rootPage,
    element: <Layout />,
    children: [...converterRoutes, ...notesRoutes],
  },
  {
    path: hostRoutes[404],
    element: (
      <Navigate
        to={hostRoutes.rootPage}
        replace
      />
    ),
  },
];

export const router = createBrowserRouter(routes);

export default routes;
