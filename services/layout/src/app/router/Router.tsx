import { createBrowserRouter } from 'react-router-dom';

import LayoutPage from '@/pages/LayoutPage/LayoutPage';

const routes = [
  {
    path: '/layout',
    element: <LayoutPage />,
  },
];

export const router = createBrowserRouter(routes);

export default routes;
