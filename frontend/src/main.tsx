import { App } from 'antd';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './assets/main.css';
import Loading from './components/Loading';
import router from './router';

const root = document.getElementById('root');
if (root === null) {
  throw new Error('root element not found');
}
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Suspense>
  </React.StrictMode>,
);
