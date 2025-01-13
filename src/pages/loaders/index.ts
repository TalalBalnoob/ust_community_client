import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { getAuth } from '../../context/AuthProvider'
import { post } from '../../types/posts.type'
import { userProfile } from '../../types/userProfile.type'
import { fetchOnePost } from '../../utils/api/fetchPosts'
import { fetchUserProfile } from '../../utils/api/userProfile'

// ------------- Posts ----------------
export const postLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<post> => {
  const { postID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const res = await fetchOnePost(Number(postID), auth)

  return res.data.data
}

export const editPostLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<post> => {
  const { postID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const { data } = await fetchOnePost(Number(postID), auth)

  return data.data
}

// ------------- Profile ----------------
export const userProfileLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile> => {
  const { userID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const res = await fetchUserProfile(userID as string, auth)

  return res.data.user
}

// ------------- Profile ----------------
export const CurrentUserProfileLoader = async (): Promise<userProfile> => {
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const res = await fetchUserProfile(auth.userData.id.toString(), auth)

  return res.data.user
}
