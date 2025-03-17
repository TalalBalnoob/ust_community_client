import { useNavigate } from 'react-router-dom'
import { PostFeed, TabBar, TopBar } from '../components'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      {/* TODO: make the nave bar fexed on all screens*/}
      <TopBar />
      <PostFeed />
      <TabBar />
    </div>
  )
}

export default HomePage
