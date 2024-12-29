import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import useAuth from './context/AuthProvider'
import CreatePostPage from './pages/CreatePostPage'
import HomePage from './pages/HomePage'
import ShowPostPage from './pages/ShowPostPage'
import NotFoundPage from './pages/utils pages/NotFoundPage'
import PrivateRoutes from './utils/PrivateRoutes'

const router = createBrowserRouter(
  createRoutesFromElements(
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
    </Route>,
  ),
)

function App() {
  const { auth } = useAuth()
  return <RouterProvider router={router} />
}

export default App
