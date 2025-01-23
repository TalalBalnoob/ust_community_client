import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { getAuth } from '../../context/AuthProvider'
import { post } from '../../types/posts.type'
import { staff, student, userProfile } from '../../types/userProfile.type'
import { fetchOnePost } from '../../utils/api/fetchPosts'
import {
  fetchUserFollowers,
  fetchUserFollowings,
  fetchUserProfile,
} from '../../utils/api/userProfile'

// ------------- Posts ----------------
export const postLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<post> => {
  const { postID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const { data } = await fetchOnePost(Number(postID), auth)

  return data
}

export const editPostLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<post> => {
  const { postID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const { data } = await fetchOnePost(Number(postID), auth)

  return data
}

// ------------- Profile ----------------
export const userProfileLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile> => {
  const { userID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const { data } = await fetchUserProfile(userID as string, auth)

  return data
}

// ------------- Profile ----------------
export const CurrentUserProfileLoader = async (): Promise<userProfile> => {
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const { data } = await fetchUserProfile(auth.userData.id.toString(), auth)

  return data
}

export const userFollowersLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile<student | staff>[]> => {
  const { userID } = params
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const { data } = await fetchUserFollowers(userID as string, auth)

  return data
}

export const userFollowingsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile<student | staff>[]> => {
  const { userID } = params
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const { data } = await fetchUserFollowings(userID as string, auth)

  return data
}
