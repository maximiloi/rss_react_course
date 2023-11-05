import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@components/Error';
import App from './App';

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
