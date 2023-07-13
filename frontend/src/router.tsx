import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

/* eslint-disable @typescript-eslint/promise-function-async */
const ErrorView = lazy(() => import('./views/ErrorView'));
const HomeView = lazy(() => import('./views/HomeView'));
const LibraryDetailView = lazy(() => import('./views/LibraryDetailView'));
const LoginView = lazy(() => import('./views/LoginView'));
const MangaDetailView = lazy(() => import('./views/MangaDetailView'));
const RootView = lazy(() => import('./views/RootView'));
/* eslint-enable @typescript-eslint/promise-function-async */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorView />}>
      <Route path="/" element={<RootView />}>
        <Route index element={<HomeView />} />
        <Route path="/library/:libraryId" element={<LibraryDetailView />} />
        <Route path="/manga/:mangaId" element={<MangaDetailView />} />
      </Route>
      <Route path="/login" element={<LoginView />} />
    </Route>,
  ),
);

export default router;
