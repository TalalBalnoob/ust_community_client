import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import { comment } from '../../types/posts.type'
import { timeAgo } from '../../utils/date'

type propsType = {
  comment: comment
}

function CustomProfileComment({ comment }: propsType) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/posts/${comment.post_id}`)}
      className='block h-fit w-full border-b border-t border-gray-200/10 p-3'
    >
      {/* User top info */}
      <div className='flex w-full items-start gap-2'>
        {/* User Image */}
        {comment.user.profile.imageUrl ? (
          <img
            src={comment.user.profile.imageUrl}
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
        <div className='flex items-start gap-2'>
          <h4 className='text-white'>{comment.user.profile.displayName}</h4>
          <p className='text-sm text-white/50'>{timeAgo(comment.created_at)}</p>
        </div>
      </div>
      {/* comment Body */}
      <div className='mt-1'>
        <div className='my-2'>
          <p className='text-left leading-7'>{comment.body}</p>
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

export default CustomProfileComment
