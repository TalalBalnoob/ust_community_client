import { useLoaderData } from 'react-router-dom'
import { TabBar, TopBar } from '../components'
import { Activity } from '../types'
import LikeActivity from '../components/activity/LikeActivity'
import CommentActivity from '../components/activity/CommentActivity'
import FollowActivity from '../components/activity/FollowActivity'

const ActivityPage = () => {
  const data = useLoaderData() as Activity[]
  return (
    <div className='h-screen w-screen flex justify-center'>
      <TopBar />
      <div className='mt-20 lg:w-2/4 xl:w-1/3'>
        <p>
          {data.map((ac) => {
            if (ac.data.type == 'like')
              return (
                <LikeActivity
                  key={ac.id}
                  username={ac.data.username as string}
                  user_id={ac.data.user_id as string}
                  post_id={ac.data.post_id as string}
                />
              )
            if (ac.data.type == 'comment')
              return (
                <CommentActivity key={ac.id}
                  username={ac.data.username as string}
                  user_id={ac.data.user_id as string}
                  post_id={ac.data.post_id as string}
                />
              )
            if (ac.data.type == 'follow')
              return <FollowActivity key={ac.id}
                username={ac.data.username as string}
                user_id={ac.data.user_id as string}
                post_id={ac.data.post_id as string}
              />
          })}
        </p>
      </div>
      <TabBar />
    </div>
  )
}

export default ActivityPage
