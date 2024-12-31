import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import useAuth from './context/AuthProvider'
import CreatePostPage from './pages/CreatePostPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ShowPostPage from './pages/ShowPostPage'
import NotFoundPage from './pages/utils pages/NotFoundPage'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  const { auth } = useAuth()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          element={<PrivateRoutes />}
          errorElement={<NotFoundPage />}
        >
          <Route
            element={<HomePage />}
            path='/'
          />
          <Route
            element={<CreatePostPage />}
            path='/create'
          />
          <Route
            element={<ShowPostPage />}
            path='/posts/:postID'
            errorElement={<NotFoundPage />}
          />
        </Route>
        <Route
          element={auth ? <Navigate to={'/'} /> : <LoginPage />}
          path='/login'
        />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
