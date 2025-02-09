import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import useAuth from './context/AuthProvider'
import CreatePostPage from './pages/CreatePostPage'
import EditPostPage from './pages/EditPostPage'
import EditUserProfilePage from './pages/EditUserProfilePage'
import HomePage from './pages/HomePage'
import {
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
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  const { auth } = useAuth()
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
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
