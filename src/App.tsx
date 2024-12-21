import { Navigate, Route, Routes } from 'react-router-dom'
import useAuth from './context/AuthProvider'
import CreatePostPage from './pages/CreatePostPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  const { auth } = useAuth()
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          element={<HomePage />}
          path='/'
        />
        <Route
          element={<CreatePostPage />}
          path='/create'
        />
      </Route>
      <Route
        element={auth ? <Navigate to={'/'} /> : <LoginPage />}
        path='/login'
      />
    </Routes>
  )
}

export default App
