import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/AuthProvider'
import { comment } from '../../types/posts.type'
import { timeAgo } from '../../utils/date'

type propsType = {
  comment: comment
}

function CustomProfileComment({ comment }: propsType) {
  const { auth } = useAuth()
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/posts/${comment.post_id}`)}
      className='block h-fit w-full border hover:bg-slate-50 border-neutral-700/10  p-3'
    >
      {/* User top info */}
      <div
        className='flex w-full items-center justify-end gap-2'
        onClick={() => {
          if (comment.user_id === auth.userData.id) navigate('/profile')
          else navigate(`/users/${comment.user_id}`)
        }}
      >
        {/* User name */}
        <div className='flex items-baseline gap-2'>
          <p className='text-lg text-black/50'>{timeAgo(comment.created_at)}</p>
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
