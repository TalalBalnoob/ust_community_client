import { createContext, ReactNode, useState } from 'react'

export type authDataType = {
  username: string
  token: string
}

const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(localStorage.getItem('auth') ?? {})

  function saveAuth(authData: authDataType) {
    localStorage.setItem('auth', JSON.stringify(authData))
    setAuth(authData)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
