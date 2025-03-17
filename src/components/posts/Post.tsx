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
  const { auth } = useAuth()
  // dummy state to force rerender when needed
  const [, setDummy] = useState(true)

  const navigate = useNavigate()

  // hook to detect the language of the post to set the align of the body
  const { detectedLanguage, detectLanguage } = useLanguageDetection()

  async function handleLikeToggle() {
    // check if the post is not liked by user to like it
    if (!post.isLiked) {
      const { status } = await likePost(post.id, auth)

      // if the req respond with 200
      if (status === 200) {
        // update post's likes btn
        post.isLiked = true
        // update the likes counter
        post.likes++
        // trigger rerender
        setDummy((v) => !v)
      }
      // check if the post is liked by user to unlike it
    } else if (post.isLiked) {
      const { status } = await unlikePost(post.id, auth)

      // if the req respond with 200
      if (status === 200) {
        // update post's likes btn
        post.isLiked = false
        // update the likes counter
        post.likes--
        // trigger rerender
        setDummy((v) => !v)
      }
    }
  }

  useEffect(() => {
    // detect the body language
    detectLanguage(post.body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='h-fit w-full border-y border-gray-200/10 p-3 lg:border-x'>
      {/* User top info */}
      <div
        className='flex w-fit cursor-default items-start gap-2'
        onClick={() => {
          if (post.user_id === auth.userData.id) navigate('/profile')
          else navigate(`/users/${post.user_id}`)
        }}
      >
        {/* User Image */}
        {post.user.imageUrl ? (
          // user image
          <img
            src={`${import.meta.env.VITE_BASE_URL}/storage/${post.user.imageUrl}`}
            alt=''
            className='size-9 rounded-md'
          />
        ) : (
          // if he don't have image use clint generated one
          <Avatar
            name={`${post.user.displayName}`}
            size='36'
            round={'6px'}
          />
        )}
        <div className='flex items-baseline gap-2'>
          {/* User name */}
          <h4 className='text-white'>{post.user.displayName}</h4>
          {/* formate the create time to a human readable formate  */}
          <p className='text-sm text-white/50'>{timeAgo(post.created_at)}</p>
        </div>
      </div>
      {/* Post Body */}
      {/* link to show the post page of this post */}
      <Link
        to={`/posts/${post.id}`}
        reloadDocument
      >
        <div className='mt-1'>
          {/* post body text */}
          {post.title ? (
            <h1
              className='mb-1 mt-2.5 text-xl text-white'
              style={{
                textAlign: detectedLanguage === 'arb' ? 'right' : 'left',
              }}
            >
              {post.title}
            </h1>
          ) : (
            ''
          )}
          <div className='my-2'>
            <p
              className='line-clamp-3 text-left text-sm leading-6 text-zinc-200/[0.95]'
              // set the text align based the the language
              style={{
                textAlign: detectedLanguage === 'arb' ? 'right' : 'left',
              }}
            >
              {post.body}
            </p>
          </div>
          {/* if post has attachment display it  */}
          <div>
            {post.attachment_url ? (
              <img
                className='mx-auto aspect-square w-[80%] rounded'
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
      <div className='mt-2 flex justify-around'>
        {/* Likes */}
        <LikeBtn
          likes={post.likes}
          isLiked={post.isLiked}
          onClick={handleLikeToggle}
        />
        {/* Comments */}
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
        {/* edit post shows only for the post owner */}
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
