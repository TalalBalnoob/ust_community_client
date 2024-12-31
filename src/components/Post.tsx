import { faComment, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import useAuth from '../context/AuthProvider'
import { post } from '../types'
import { likePost, unlikePost } from '../utils/api/fetchMethods'
import { timeAgo } from '../utils/date'
import LikeBtn from './LikeBtn'
import PrivateComponent from './PrivateComponent'

/* -------------------- Tasks -------------------------------- */
// TODO: add title to the post
// TODO: add language detect lib to set the text alignment
/* -------------------- Tasks -------------------------------- */
function Post({
  post,
  triggerRerender,
}: {
  post: post
  triggerRerender: () => void
}) {
  const [, setDummy] = useState(true)
  const { auth } = useAuth()
  const navigate = useNavigate()
  async function handleLikeToggle() {
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
        post = post
        setDummy((v) => !v)
      }
    }
  }

  return (
    <div className='h-fit w-full p-3 border-t border-b border-gray-200/10'>
      {/* User top info */}
      <div
        className='flex items-start w-fit gap-2 cursor-default'
        onClick={() => {
          navigate(`/users/${post.user_id}`)
        }}
      >
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
          <p className='text-white/50 text-sm'>{timeAgo(post.created_at)}</p>
        </div>
      </div>
      {/* Post Body */}
      <div
        className='mt-1'
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        <div className=' my-2'>
          <p className='text-left	leading-7'>{post.body}</p>
        </div>
        <div>
          {post.attachment_url ? (
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
        <LikeBtn
          likes={post.likes}
          isLiked={post.isLiked}
          onClick={handleLikeToggle}
        />
        <button
          className='flex items-center gap-1 '
          onClick={() => navigate(`/posts/${post.id}`)}
        >
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
              className='flex items-center gap-1 '
              onClick={() => navigate(`/posts/${post.id}/edit`)}
            >
              <FontAwesomeIcon
                icon={faPen}
                className='text-zinc-400'
              />
            </button>
          }
        />
      </div>
    </div>
  )
}

export default Post
