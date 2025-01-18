import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const fetchUserProfile = async (userID: string, auth: AuthData) => {
  return await axios.get(`/user/profile/${userID}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}

export const fetchUserFollowers = async (userID: string, auth: AuthData) => {
  return await axios.get(`/user/profile/${userID}/followers`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}

export const fetchUserFollowings = async (userID: string, auth: AuthData) => {
  return await axios.get(`/user/profile/${userID}/followings`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
