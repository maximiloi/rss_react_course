import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@components/ErrorPage';
import Item, { loaderCardData } from '@components/Item';
import App from './App';

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'item/:itemId',
        element: <Item />,
        loader: loaderCardData,
      },
    ],
  },
]);

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <RouterProvider router={router} />
);
