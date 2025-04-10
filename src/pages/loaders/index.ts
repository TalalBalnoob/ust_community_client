import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { getAuth } from '../../context/AuthProvider'
import { comment, post } from '../../types/posts.type'
import { staff, student, userProfile } from '../../types/userProfile.type'
import { fetchOnePost, fetchPostComments } from '../../utils/api/fetchPosts'
import {
  fetchUserFollowers,
  fetchUserFollowings,
  fetchUserProfile,
} from '../../utils/api/userProfile'

// ------------- Posts ----------------
export const postLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<{ post: post; comments: comment[] }> => {
  const { postID } = params
  const auth = getAuth()
  if (!auth) return redirect('/login')

  const post = await fetchOnePost(Number(postID), auth)
  const comments = await fetchPostComments(Number(postID), auth)

  return { post: post.data, comments: comments.data }
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
export const CurrentUserProfileLoader = async (): Promise<
  userProfile | Response
> => {
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const { data } = await fetchUserProfile(auth.userData.id.toString(), auth)

  return data
}

export const userFollowersLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile<student | staff>[] | Response> => {
  const { userID } = params
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const { data } = await fetchUserFollowers(userID as string, auth)

  return data
}

export const userFollowingsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile<student | staff>[] | Response> => {
  const { userID } = params
  const auth = getAuth()

  if (!auth) return redirect('/login')

  const { data } = await fetchUserFollowings(userID as string, auth)

  return data
}
