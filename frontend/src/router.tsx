import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './page/ErrorPage'
import LibraryDetailPage from './page/LibraryDetailPage'
import LibraryListPage from './page/LibraryListPage'
import LoginPage from './page/LoginPage'
import MangaDetailPage from './page/MangaDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LibraryListPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/library/:libraryId',
    element: <LibraryDetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/manga/:mangaId',
    element: <MangaDetailPage />,
    errorElement: <ErrorPage />,
  },
])

export default router
