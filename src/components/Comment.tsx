import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import useAuth from '../context/AuthProvider'
import { comment } from '../types/posts.type'
import { timeAgo } from '../utils/date'
import useLanguageDetection from '../utils/lang/LanguageDetector'
import PrivateComponent from './PrivateComponent'

type propsType = {
  comment: comment
  handleDeleteComment: (commentID: number) => void
}

function Comment({ comment, handleDeleteComment }: propsType) {
  const { detectedLanguage, detectLanguage } = useLanguageDetection()
  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    // detect the body language
    detectLanguage(comment.body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='block h-fit w-full border border-neutral-700/10 p-3'>
      {/* User top info */}
      <div
        className='flex w-full items-center justify-end gap-2'
        onClick={() => {
          if (comment.user_id === auth.userData.id) navigate('/profile')
          else navigate(`/users/${comment.user_id}`)
        }}
      >
        <PrivateComponent
          ownerId={comment.user_id}
          component={
            <button className='mr-auto flex items-center gap-1'>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='text-sec/80 '
                onClick={() => handleDeleteComment(comment.id)}
              />
            </button>
          }
        />
        {/* User name */}
        <div className='flex items-baseline gap-2'>
          <p className='text-sm text-black/50'>{timeAgo(comment.created_at)}</p>
          <h4 className=''>{comment.user.profile.displayName}</h4>
        </div>
        {/* User Image */}
        {comment.user.profile.imageUrl ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/storage/${comment.user.profile.imageUrl}`}
            alt=''
            className='size-9 rounded-md'
          />
        ) : (
          <Avatar
            name={`${comment.user.profile.displayName}`}
            size='36'
            round={'6px'}
          />
        )}
      </div>
      {/* comment Body */}
      <div className='mt-1'>
        <div className='my-2'>
          <p
            className='text-left text-sm leading-6 xl:text-base'
            style={{
              textAlign: detectedLanguage === 'arb' ? 'right' : 'left',
            }}
          >
            {comment.body}
          </p>
        </div>
        <div>
          {comment.attachment_url ? (
            <img
              className='rounded'
              src={`${import.meta.env.VITE_BASE_URL}/storage/${comment.attachment_url}`}
              alt=''
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
