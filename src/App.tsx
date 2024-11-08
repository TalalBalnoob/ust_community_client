import { Route, Routes } from 'react-router-dom'
import HomePage from './pages'
import LoginPage from './pages/login'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          element={<HomePage />}
          path='/'
        />
      </Route>
      <Route
        element={<LoginPage />}
        path='/login'
      />
    </Routes>
  )
}

export default App
