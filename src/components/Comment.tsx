import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import Avatar from 'react-avatar'
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

  useEffect(() => {
    // detect the body language
    detectLanguage(comment.body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='block h-fit w-full border-b border-t border-gray-200/10 p-3'>
      {/* User top info */}
      <div className='flex w-full items-center gap-2'>
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
        {/* User name */}
        <div className='flex items-baseline gap-2'>
          <h4 className='text-white'>{comment.user.profile.displayName}</h4>
          <p className='text-sm text-white/50'>{timeAgo(comment.created_at)}</p>
        </div>
        <PrivateComponent
          ownerId={comment.user_id}
          component={
            <button className='ml-auto flex items-center gap-1'>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='text-zinc-400'
                onClick={() => handleDeleteComment(comment.id)}
              />
            </button>
          }
        />
      </div>
      {/* comment Body */}
      <div className='mt-1'>
        <div className='my-2'>
          <p
            className='text-left leading-6'
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
