import { createBrowserRouter } from 'react-router-dom'
import ErrorView from './views/ErrorView'
import LibraryDetailView from './views/LibraryDetailView'
import LibraryListView from './views/LibraryListView'
import LoginView from './views/LoginView'
import MangaDetailView from './views/MangaDetailView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LibraryListView />,
    errorElement: <ErrorView />,
  },
  {
    path: '/login',
    element: <LoginView />,
    errorElement: <ErrorView />,
  },
  {
    path: '/library/:libraryId',
    element: <LibraryDetailView />,
    errorElement: <ErrorView />,
  },
  {
    path: '/manga/:mangaId',
    element: <MangaDetailView />,
    errorElement: <ErrorView />,
  },
])

export default router
