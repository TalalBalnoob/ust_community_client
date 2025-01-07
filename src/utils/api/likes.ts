import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const likePost = async (postId: number, auth: AuthData) => {
  return await axios.put(
    `/like/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${auth.token}` } },
  )
}

export const unlikePost = async (postId: number, auth: AuthData) => {
  return await axios.delete(`/unlike/${postId}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
