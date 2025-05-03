import { useNavigate } from 'react-router-dom'

type FollowActivityProps = {
  username: string
  user_id: string
  post_id: string
}

function FollowActivity({ username, user_id, post_id }: FollowActivityProps) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/users/' + user_id)}
      className='flex justify-end text-right hover:bg-slate-50 border-y border-neutral-700/10 items-center p-3 lg:border-x'>
      <div>
        <h1>متابعة جديدة</h1>
        <p>
          بداء بمتابعتك{' '}
          {username}
        </p>
      </div>
    </div >
  )
}

export default FollowActivity
