import { useEffect, useState } from 'react'
import useAuth from '../../context/AuthProvider'
import { post } from '../../types/posts.type'
import { fetchAllPosts } from '../../utils/api/fetchPosts'
import Post from '../posts/Post'

function PostFeed() {
  const [posts, setPosts] = useState<post[]>([])
  // page counter to support pagination
  const [page, setPage] = useState<number>(1)
  // dummy state to force rerender when needed
  const [dummy, setDummy] = useState(true)

  const { auth } = useAuth()

  useEffect(() => {
    // fetch the post based on page
    const fetchPosts = async () => {
      try {
        const res = await fetchAllPosts(auth, page)
        setPosts((posts) => [...posts, ...res.data])
      } catch (e) {
        console.error(e)
      }
    }

    fetchPosts()
  }, [page, dummy, auth])

  useEffect(() => {
    // handel the pagination on scroll
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handelScroll = (e: any) => {
      const scrollHeight = e.target.documentElement.scrollHeight
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight
      // when reach the end fetch the next page
      if (currentHeight + 1 >= scrollHeight) setPage(page + 1)
    }

    window.addEventListener('scroll', handelScroll)
    return () => window.removeEventListener('scroll', handelScroll)
  }, [page])

  // use the dummy state to trigger the render
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
