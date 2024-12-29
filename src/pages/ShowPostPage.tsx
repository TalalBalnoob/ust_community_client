import { faComment } from '@fortawesome/free-regular-svg-icons'
import {
  faHouse,
  faShareSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Comment, LikeBtn, PrivateComponent } from '../components'
import useAuth from '../context/AuthProvider'
import { post } from '../types'
import axios from '../utils/api/axios'
import { fetchOnePost, likePost, unlikePost } from '../utils/api/fetchMethods'
import { timeAgo } from '../utils/date'

function ShowPostPage() {
  const navigate = useNavigate()
  const [dummy, setDummy] = useState(true)
  const [commentBody, setCommentBody] = useState<string>('')
  let { postID } = useParams()
  const [post, setPost] = useState<post>()

  const { auth } = useAuth()

  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const res = await fetchOnePost(Number(postID), auth)
        setPost(() => res.data.data)
      } catch {
        throw Error('Not Found')
      }
    }

    fetchMethod()
  }, [dummy])

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('body', commentBody as string)
    const res = await axios.post(`/posts/${post?.id}/comments`, formData, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (res.status === 200) {
      setCommentBody(() => '')
      setDummy((v) => !v)
    }
  }

  async function handleLikeToggle() {
    console.log(1)
    if (!post) return 0

    console.log(2)
    if (!post.isLiked) {
      const { status } = await likePost(post.id, auth)

      if (status === 200) {
        post.isLiked = true
        post.likes++
        setDummy((v) => !v)
      }
    } else if (post.isLiked) {
      const { status } = await unlikePost(post.id, auth)

      if (status === 200) {
        post.isLiked = false
        post.likes--
        setDummy((v) => !v)
      }
    }
  }

  async function handleDeletePost() {
    const confirmation = confirm('هل انت متأكد من حذف المنشور؟')
    if (!confirmation) return 0

    const res = await axios.delete(`/posts/${postID}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (res.status === 200) {
      triggerRerender()
      return navigate('..')
    }
  }

  const triggerRerender = () => {
    setDummy((v) => !v)
  }

  if (post) {
    return (
      <div className='w-screen h-screen'>
        <nav className='bg-transparent h-14 text-3xl mr-auto flex justify-between items-center'>
          <div className='w-10'></div>
          <h1>UST-C</h1>
          <Button
            className='text-sm px-2 mx-2 py-1 rounded-sm bg-transparent'
            text={
              <FontAwesomeIcon
                icon={faHouse}
                size='xl'
              />
            }
            type='button'
            onClick={() => navigate('..')}
          />
        </nav>

        <main>
          <div className='h-fit w-full p-3 border-t border-b border-gray-200/10'>
            {/* User top info */}
            <div className='flex items-start gap-2'>
              {/* User Image */}
              {post.user.imageUrl ? (
                <img
                  src={post.user.imageUrl}
                  alt=''
                  className='size-9 rounded-md'
                />
              ) : (
                <Avatar
                  name={`${post.user.displayName}`}
                  size='36'
                  round={'6px'}
                />
              )}
              {/* User name */}
              <div className='flex gap-2 items-baseline'>
                <h4 className='text-white'>{post.user.displayName}</h4>
                <p className='text-white/50 text-sm'>
                  {timeAgo(post.created_at as string)}
                </p>
              </div>
            </div>
            {/* Post Body */}
            <div className='mt-1'>
              <div className=' my-2'>
                <p className='text-left	leading-7'>{post.body}</p>
              </div>
              <div>
                {post?.attachment_url ? (
                  <img
                    className='rounded'
                    src={`${import.meta.env.VITE_BASE_URL}/storage/${post.attachment_url}`}
                    alt=''
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            {/* Post interactions */}
            <div className=' flex justify-around mt-1'>
              {/* Like btn */}
              {/* TODO: make like btn work */}
              <LikeBtn
                likes={post.likes as number}
                isLiked={post.isLiked as boolean}
                onClick={handleLikeToggle}
              />
              {/* Like btn */}
              {/* TODO: make like btn work */}
              <button className='flex items-center gap-1 '>
                <FontAwesomeIcon
                  icon={faComment}
                  className='text-zinc-400'
                />
                <p className='text-sm'>{post.comments.length}</p>
              </button>
              <button className='flex items-center gap-1 '>
                <FontAwesomeIcon
                  icon={faShareSquare}
                  className='text-zinc-400'
                />
              </button>
              <PrivateComponent
                ownerId={post.user_id}
                component={
                  <button
                    className='flex items-center gap-1'
                    onClick={handleDeletePost}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='text-zinc-400'
                    />
                  </button>
                }
              />
            </div>
          </div>
        </main>
        <div>
          <form
            method='post'
            className='mt-2'
            onSubmit={handleFormSubmit}
          >
            <textarea
              name=''
              id=''
              placeholder='اكتب تعليقك هنا'
              className='w-full text-right rounded bg-zinc-800 px-3 py-1.5 text-base text-zinc-200 outline outline-1 -outline-offset-1 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
              rows={3}
              required
              onChange={(e) => setCommentBody(e.target.value)}
              value={commentBody}
            ></textarea>
            <div className='flex justify-between items-center'>
              <button
                type='submit'
                className='p-2 px-4 m-2 h-fit rounded bg-zinc-600'
              >
                نشر
              </button>
              <h2 className='text-xl mt-6 mb-3 mx-2 text-right'>
                {post.comments.length} التعليقات
              </h2>
            </div>
          </form>
        </div>
        {post.comments.map((comment) => (
          <Comment
            comment={comment}
            parentId={post.id}
            onRerender={triggerRerender}
          />
        ))}
      </div>
    )
  } else {
    return <h1 className='flex justify-center items-center'>Loading...</h1>
  }
}

export default ShowPostPage
