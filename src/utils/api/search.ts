import { AuthData } from '../../types/auth.type'
import { post } from '../../types/posts.type'
import { staff, student, userProfile } from '../../types/userProfile.type'
import axios from './axios'

type searchRes = {
  posts: post[]
  users: userProfile<student | staff>[]
}

export const search = async (searchText: string, auth: AuthData) => {
  return await axios.get<searchRes>(`/search/`, {
    headers: { Authorization: `Bearer ${auth.token}` },
    params: {
      text: searchText,
    },
  })
}
