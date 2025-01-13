import { faComment, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../context/AuthProvider'
import { post } from '../../types/posts.type'
import { likePost, unlikePost } from '../../utils/api/likes'
import { timeAgo } from '../../utils/date'
import useLanguageDetection from '../../utils/lang/LanguageDetector'
import PrivateComponent from '../PrivateComponent'
import LikeBtn from './LikeBtn'

/* -------------------- Tasks -------------------------------- */
// TODO: add title to the post
/* -------------------- Tasks -------------------------------- */
function Post({ post }: { post: post; triggerRerender: () => void }) {
  const [, setDummy] = useState(true)
  const { auth } = useAuth()
  const { detectedLanguage, detectLanguage } = useLanguageDetection()
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
        setDummy((v) => !v)
      }
    }
  }

  useEffect(() => {
    detectLanguage(post.body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='h-fit w-full border-b border-t border-gray-200/10 p-3'>
      {/* User top info */}
      <div
        className='flex w-fit cursor-default items-start gap-2'
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
        <div className='flex items-baseline gap-2'>
          <h4 className='text-white'>{post.user.displayName}</h4>
          <p className='text-sm text-white/50'>{timeAgo(post.created_at)}</p>
        </div>
      </div>
      {/* Post Body */}
      <Link
        to={`/posts/${post.id}`}
        reloadDocument
      >
        <div className='mt-1'>
          <div className='my-2'>
            <p
              className='text-left leading-7'
              style={{
                textAlign: detectedLanguage === 'arb' ? 'right' : 'left',
              }}
            >
              {post.body}
            </p>
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
      </Link>

      {/* Post interactions */}
      <div className='mt-1 flex justify-around'>
        <LikeBtn
          likes={post.likes}
          isLiked={post.isLiked}
          onClick={handleLikeToggle}
        />
        <button
          className='flex items-center gap-1'
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          <FontAwesomeIcon
            icon={faComment}
            className='text-zinc-400'
          />
          <p className='text-sm'>{post.comments.length}</p>
        </button>
        <button className='flex items-center gap-1'>
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
