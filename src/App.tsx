import { useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import useAuth, { getAuth } from './context/AuthProvider'
import CreatePostPage from './pages/CreatePostPage'
import EditPostPage from './pages/EditPostPage'
import EditUserProfilePage from './pages/EditUserProfilePage'
import HomePage from './pages/HomePage'
import {
  ActivityLoader,
  CurrentUserProfileLoader,
  editPostLoader,
  postLoader,
  userFollowersLoader,
  userFollowingsLoader,
  userProfileLoader,
} from './pages/loaders'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import ShowPostPage from './pages/ShowPostPage'
import UserProfilePage from './pages/UserProfilePage'
import UserList from './pages/UsersList'
import NotFoundPage from './pages/utils pages/NotFoundPage'
import { checkToken } from './utils/api/auth'
import PrivateRoutes from './utils/PrivateRoutes'
import ActivityPage from './pages/ActivityPage'

function App() {
  const { auth } = useAuth()

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const auth = getAuth() // Ensure `auth` is retrieved correctly

        if (!auth || !auth.token) {
          localStorage.removeItem('auth')
          return
        }

        const { status } = await checkToken(auth)
        if (status !== 200) {
          localStorage.removeItem('auth')
        }
      } catch (error) {
        localStorage.removeItem('auth')
      }
    }

    validateAuth()
  }, [])

  const router = createBrowserRouter([
    {
      path: '/login',
      element: auth ? <Navigate to={'/'} /> : <LoginPage />,
    },
    // all the protected routes
    {
      errorElement: <NotFoundPage />,
      element: <PrivateRoutes />,
      path: '/',
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
          path: '/profile',
          element: <UserProfilePage />,
          loader: CurrentUserProfileLoader,
        },
        {
          path: '/profile/edit',
          element: <EditUserProfilePage />,
          loader: CurrentUserProfileLoader,
        },
        {
          path: '/search',
          element: <SearchPage />,
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
        {
          path: '/users/:userID/followers',
          element: <UserList />,
          loader: userFollowersLoader,
        },
        {
          path: '/users/:userID/followings',
          element: <UserList />,
          loader: userFollowingsLoader,
        },
        {
          path: '/activity',
          element: <ActivityPage />,
          loader: ActivityLoader,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
