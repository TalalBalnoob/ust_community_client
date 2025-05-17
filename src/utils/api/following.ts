import { AuthData } from '../../types/auth.type'
import axios from './axios'

export const followUser = async (auth: AuthData, user_id: number) => {
  const res = await axios.put(
    `/follow/${user_id}`,
    {},
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${auth.token}` },
    },
  )

  if (res.status !== 200) throw Error('something went wrong')

  return res
}

export const unFollowUser = async (auth: AuthData, user_id: number) => {
  const res = await axios.delete(`/follow/${user_id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${auth.token}` },
  })

  if (res.status !== 200) throw Error('something went wrong')

  return res
}
