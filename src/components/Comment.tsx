import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import useAuth from '../context/AuthProvider'
import { comment as commentType } from '../types'
import axios from '../utils/api/axios'
import { timeAgo } from '../utils/date'
import PrivateComponent from './PrivateComponent'

type propsType = {
  comment: commentType
  parentId: number
  onRerender: () => void
}

function Comment({ comment, parentId, onRerender }: propsType) {
  const { auth } = useAuth()
  const navigate = useNavigate()

  async function handleDeleteComment() {
    const confirmation = confirm('هل انت متأكد من حذف التعليق؟')
    if (!confirmation) return 0

    const res = await axios.delete(
      `/posts/${parentId}/comments/${comment.id}`,
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      },
    )

    if (res.status === 200) {
      onRerender()
      return navigate(`/posts/${parentId}`)
    }
  }
  return (
    <div className='h-fit w-full p-3 block border-t border-b border-gray-200/10'>
      {/* User top info */}
      <div className='flex items-center w-full gap-2'>
        {/* User Image */}
        {comment.user.imageUrl ? (
          <img
            src={comment.user.imageUrl}
            alt=''
            className='size-9 rounded-md'
          />
        ) : (
          <Avatar
            name={`${comment.user.displayName}`}
            size='36'
            round={'6px'}
          />
        )}
        {/* User name */}
        <div className='flex gap-2 items-baseline'>
          <h4 className='text-white'>{comment.user.displayName}</h4>
          <p className='text-white/50 text-sm'>{timeAgo(comment.created_at)}</p>
        </div>
        <PrivateComponent
          ownerId={comment.user_id}
          component={
            <button className='ml-auto flex items-center gap-1 '>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='text-zinc-400'
                onClick={handleDeleteComment}
              />
            </button>
          }
        />
      </div>
      {/* comment Body */}
      <div className='mt-1'>
        <div className=' my-2'>
          <p className='text-left	leading-7'>{comment.body}</p>
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
