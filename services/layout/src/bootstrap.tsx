import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './app/router/Router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('#root не найден');
}

const container = createRoot(root);

container.render(<RouterProvider router={router} />);