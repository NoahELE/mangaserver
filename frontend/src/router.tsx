import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './page/ErrorPage'
import LibraryListPage from './page/LibraryListPage'
import LoginPage from './page/LoginPage'
import MangaListPage from './page/MangaListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LibraryListPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/library/:libraryId',
    element: <MangaListPage />,
  },
])

export default router
