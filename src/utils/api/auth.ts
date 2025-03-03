import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const login = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  return await axios.post('/login', JSON.stringify({ username, password }), {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })
}

export const logout = async (auth: AuthData) => {
  return await axios.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    },
  )
}

export const checkToken = async (auth: AuthData) => {
  return await axios.get('/token', {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
}
