import { useEffect, useState } from 'react'
import useAuth from '../context/AuthProvider'
import { post } from '../types'
import { fetchAllPosts } from '../utils/api/fetchMethods'
import Post from './Post'

function PostFeed() {
  const [posts, setPosts] = useState<post[]>([])
  const [dummy, setDummy] = useState(true)
  const [page, setPage] = useState<number>(1)

  const { auth } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetchAllPosts(auth, page)
        setPosts((posts) => [...posts, ...res.posts.data])
      } catch (e) {
        console.error(e)
      }
    }

    fetchPosts()
  }, [page, dummy])

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

  const triggerRerender = () => {
    setDummy((v) => !v)
  }

  return (
    <>
      {posts.map((post) => (
        <Post
          post={post}
          key={post.id}
          triggerRerender={triggerRerender}
        />
      ))}
    </>
  )
}

export default PostFeed
