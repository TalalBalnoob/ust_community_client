import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import useAuth from './context/AuthProvider'
import CreatePostPage from './pages/CreatePostPage'
import EditPostPage from './pages/EditPostPage'
import HomePage from './pages/HomePage'
import { editPostLoader, postLoader, userProfileLoader } from './pages/loaders'
import LoginPage from './pages/LoginPage'
import ShowPostPage from './pages/ShowPostPage'
import UserProfilePage from './pages/UserProfilePage'
import NotFoundPage from './pages/utils pages/NotFoundPage'

function App() {
  const { auth } = useAuth()
  const router = createBrowserRouter([
    {
      path: '/login',
      element: auth ? <Navigate to={'/'} /> : <LoginPage />,
    },
    {
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/create',
          element: <CreatePostPage />,
        },
        {
          path: '/posts/:postID',
          element: <ShowPostPage />,
          loader: postLoader,
        },
        {
          path: '/posts/:postID/edit',
          element: <EditPostPage />,
          loader: editPostLoader,
        },

        {
          path: '/users/:userID',
          element: <UserProfilePage />,
          loader: userProfileLoader,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
