import { getPostsType } from '../../types'
import { AuthData } from '../../types/auth.type'
import { post } from '../../types/posts.type'
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
