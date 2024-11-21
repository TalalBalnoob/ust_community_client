import { Navigate, Route, Routes } from 'react-router-dom'
import useAuth from './context/AuthProvider'
import HomePage from './pages'
import LoginPage from './pages/login'
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
      </Route>
      <Route
        element={auth ? <Navigate to={'/'} /> : <LoginPage />}
        path='/login'
      />
    </Routes>
  )
}

export default App
