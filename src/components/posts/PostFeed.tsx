import { useEffect, useState } from 'react'
import useAuth from '../../context/AuthProvider'
import { post } from '../../types/posts.type'
import { fetchAllPosts } from '../../utils/api/fetchPosts'
import Post from '../posts/Post'

function PostFeed() {
  const [posts, setPosts] = useState<post[]>([])
  const [dummy, setDummy] = useState(true)
  const [page, setPage] = useState<number>(1)

  const { auth } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetchAllPosts(auth, page)
        setPosts((posts) => [...posts, ...res])
      } catch (e) {
        console.error(e)
      }
    }

    fetchPosts()
  }, [page, dummy, auth])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
