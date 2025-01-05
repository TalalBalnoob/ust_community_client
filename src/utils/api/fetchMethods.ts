import { AuthData } from '../../context/AuthProvider'
import { getPostsType, post, userProfile } from '../../types'
import axios from './axios'

export const fetchAllPosts = async (
  auth: AuthData,
  page?: number,
): Promise<getPostsType> => {
  const res = await axios.get<getPostsType>(`/posts?page=${page}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${auth.token}` },
  })

  if (res.status !== 200) throw Error('something went wrong')

  return res.data
}

export const fetchOnePost = async (postID: number, auth: AuthData) => {
  return await axios.get<{ data: post }>(`/posts/${postID}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}

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

export const fetchUserProfile = async (userId: string, auth: AuthData) => {
  return await axios.get<{ user: userProfile }>(`/user/profile/${userId}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}
