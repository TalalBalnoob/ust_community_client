import { useNavigate } from 'react-router-dom'
import { PostFeed, TabBar, TopBar } from '../components'
import SearchInput from '../components/SearchInput'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      {/* TODO: make the nave bar fexed on all screens*/}
      <TopBar right={"UST-C"} center={<SearchInput />} />
      <PostFeed />
      <TabBar />
    </div>
  )
}

export default HomePage
