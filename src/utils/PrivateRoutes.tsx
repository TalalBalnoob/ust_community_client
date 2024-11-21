import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../context/AuthProvider'

function PrivateRoutes() {
  const { auth } = useAuth()
  return auth ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
