import { useState } from 'react'
import { AuthData } from '../types/auth.type'

export const getAuth = (): AuthData => {
  // TODO: add a check request to check if token still valid
  const tokenString = localStorage.getItem('auth')
  const userToken = JSON.parse(tokenString as string)
  return userToken
}

export default function useAuth() {
  const [auth, setAuth] = useState<AuthData>(getAuth())

  const saveAuth = (userAuth: AuthData) => {
    localStorage.setItem('auth', JSON.stringify(userAuth))
    setAuth(userAuth)
  }

  return {
    setAuth: saveAuth,
    auth,
  }
}
