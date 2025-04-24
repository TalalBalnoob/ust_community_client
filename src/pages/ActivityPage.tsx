import { useLoaderData } from 'react-router-dom'
import { TabBar, TopBar } from '../components'
import { Activity } from '../types'

const ActivityPage = () => {
  const { data } = useLoaderData() as { data: Activity[] }
  return (
    <div className='h-screen w-screen flex justify-center '>
      <TopBar />
      <div className='mt-20'>
        <p>
          {data.map(ac => <h1 key={ac.id}>{ac.data.message}</h1>)}
        </p>
      </div>
      <TabBar />
    </div>
  )
}

export default ActivityPage
