import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './assets/main.css';
import Loading from './components/Loading';
import router from './router';

const root = document.getElementById('root');
if (root != null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>,
  );
}
