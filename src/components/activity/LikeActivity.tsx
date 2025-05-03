import { useNavigate } from 'react-router-dom'

type LikeActivityProps = {
  username: string
  user_id: string
  post_id: string
}

function LikeActivity({ username, user_id, post_id }: LikeActivityProps) {
  const navigate = useNavigate()
  return (
    <div className='flex justify-end text-right hover:bg-slate-50 border-y border-neutral-700/10 items-center p-3 lg:border-x'>
      <button
        onClick={() => navigate('/posts/' + post_id)}
        className=' mr-auto bg-blue-500 text-white rounded-lg px-3 h-fit text-sm py-2'
      >
        عرض المنشور
      </button>
      <div>
        <h1>أعجاب جديد</h1>
        <p>
          اعجب بمنشورك{' '}
          <span onClick={() => navigate('/users/' + user_id)}>{username}</span>
        </p>
      </div>
    </div>
  )
}

export default LikeActivity
