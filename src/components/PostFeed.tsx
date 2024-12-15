import { useEffect, useState } from 'react'
import useAuth from '../context/AuthProvider'
import { getPostsType, post } from '../types'
import axios from '../utils/api/axios'
import Post from './Post'

function PostFeed() {
  const [posts, setPosts] = useState<post[]>([])
  const [page, setPage] = useState<number>(1)

  const { auth } = useAuth()

  useEffect(() => {
    axios
      .get<getPostsType>(`/posts?page=${page}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        setPosts([...posts, ...res.data.posts.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [page])

  useEffect(() => {
    const handelScroll = (e: any) => {
      const scrollHeight = e.target.documentElement.scrollHeight
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight
      if (currentHeight + 1 >= scrollHeight) setPage(page + 1)
    }

    window.addEventListener('scroll', handelScroll)
    return () => window.removeEventListener('scroll', handelScroll)
  }, [page])

  return (
    <>
      {posts.map((post) => (
        <Post />
      ))}
    </>
  )
}

export default PostFeed
