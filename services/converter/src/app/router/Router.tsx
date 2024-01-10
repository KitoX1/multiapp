import { Navigate, createBrowserRouter } from 'react-router-dom';
import { converterRoutes } from '@packages/shared';
import { ConverterPage } from '@/pages';

const routes = [
  {
    path: converterRoutes.converter,
    element: <ConverterPage />,
  },
  {
    path: converterRoutes[404],
    element: (
      <Navigate
        to={converterRoutes.converter}
        replace
      />
    ),
  },
];

export const router = createBrowserRouter(routes);

export default routes;
