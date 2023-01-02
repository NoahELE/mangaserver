import { createBrowserRouter } from 'react-router-dom'
import LibraryPage from './page/LibraryPage'
import LoginPage from './page/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <LibraryPage />,
  },
])
