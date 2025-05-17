import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const bookmarkPost = async (postId: number, auth: AuthData) => {
  return await axios.put(
    `/bookmark/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${auth.token}` } },
  )
}

export const unBookmarkPost = async (postId: number, auth: AuthData) => {
  return await axios.delete(`/bookmark/${postId}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
