import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const fetchActivity = async (auth: AuthData) => {
  return await axios.get(`/activity`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
