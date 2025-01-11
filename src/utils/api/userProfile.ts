import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const fetchUserProfile = async (userID: string, auth: AuthData) => {
  return await axios.get(`/user/profile/${userID}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
