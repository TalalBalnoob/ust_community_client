import { useEffect } from 'react'
import axios from '../utils/api/axios'
import Post from './Post'

function PostFeed() {
  useEffect(() => {
    // FIXME: add token for the req
    axios
      .get('/posts', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Post />
      <Post />
      <Post />
    </>
  )
}

export default PostFeed
