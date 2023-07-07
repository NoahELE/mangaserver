import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorView from './views/ErrorView';
import HomeView from './views/HomeView';
import LibraryDetailView from './views/LibraryDetailView';
import LoginView from './views/LoginView';
import MangaDetailView from './views/MangaDetailView';
import RootView from './views/RootView';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorView />}>
      <Route path="/" element={<RootView />}>
        <Route index element={<HomeView />} />
        <Route path="/library/:libraryId" element={<LibraryDetailView />} />
        <Route path="/manga/:mangaId" element={<MangaDetailView />} />
      </Route>
      <Route path="/login" element={<LoginView />} />
    </Route>
  )
);

export default router;
