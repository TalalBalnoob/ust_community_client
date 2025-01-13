import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../context/AuthProvider'

function PrivateRoutes() {
  console.log(1)
  const { auth } = useAuth()
  console.log(auth)
  return auth ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/login'}
      replace
    />
  )
}

export default PrivateRoutes
