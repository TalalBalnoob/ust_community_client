import { AuthData } from '../../types/auth.type'
import axios from './axios'

export async function deletePost(postID: string, auth: AuthData) {
  return await axios.delete(`/posts/${postID}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}

export async function deleteComment(
  parentId: string,
  commentId: string,
  auth: AuthData,
) {
  return await axios.delete(`/posts/${parentId}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
