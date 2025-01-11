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
