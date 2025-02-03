import { AuthData } from '../../types/auth.type'
import { comment, post } from '../../types/posts.type'
import axios from './axios'

export const fetchAllPosts = async (
  auth: AuthData,
  page?: number,
): Promise<post[]> => {
  const res = await axios.get<post[]>(`/posts?page=${page}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${auth.token}` },
  })

  if (res.status !== 200) throw Error('something went wrong')

  return res.data
}

export const fetchOnePost = async (postID: number, auth: AuthData) => {
  return await axios.get<post>(`/posts/${postID}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}

export const fetchPostComments = async (postID: number, auth: AuthData) => {
  return await axios.get<comment[]>(`/posts/${postID}/comments`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
}

export const editPost = async (
  postID: string,
  auth: AuthData,
  { title, body }: { title: string; body: string },
) => {
  return await axios.put(
    `/posts/${postID}`,
    { title, body },
    {
      headers: { Authorization: `Bearer ${auth.token}` },
    },
  )
}
