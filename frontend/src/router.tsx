import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const ErrorView = lazy(async () => await import('./views/ErrorView'));
const HomeView = lazy(async () => await import('./views/HomeView'));
const LibraryDetailView = lazy(
  async () => await import('./views/LibraryDetailView'),
);
const LoginView = lazy(async () => await import('./views/LoginView'));
const MangaDetailView = lazy(
  async () => await import('./views/MangaDetailView'),
);
const RootView = lazy(async () => await import('./views/RootView'));

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
