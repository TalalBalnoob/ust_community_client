// import { createContext, ReactNode, useState } from 'react'

// export type authDataType = {
//   username: string
//   token: string
// }

// const AuthContext = createContext({})

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [auth, setAuth] = useState(localStorage.getItem('auth') ?? {})

//   function saveAuth(authData: authDataType) {
//     localStorage.setItem('auth', JSON.stringify(authData))
//     setAuth(authData)
//   }

//   function getAuthUser() {
//     const auth = localStorage.getItem('auth')
//   }

//   return (
//     <AuthContext.Provider value={{ auth, saveAuth, getAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContext

type AuthData = {
  token: string
  userData: { id: number; username: string }
}

import { useState } from 'react'

export default function useAuth() {
  const getToken = () => {
    // TODO: add a check request to check if token still valid
    const tokenString = localStorage.getItem('auth')
    const userToken = JSON.parse(tokenString as string)
    return userToken
  }

  const [auth, setAuth] = useState<AuthData>(getToken())

  const saveAuth = (userAuth: AuthData) => {
    localStorage.setItem('auth', JSON.stringify(userAuth))
    setAuth(userAuth)
  }

  return {
    setAuth: saveAuth,
    auth,
  }
}
