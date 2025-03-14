import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { PostFeed, TabBar } from '../components'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      {/* TODO: make the nave bar fexed on all screens*/}
      <nav className='mr-auto flex h-14 items-center justify-between border-b border-gray-200/10 bg-zinc-900 text-3xl lg:mb-12'>
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <FontAwesomeIcon
          icon={faSearch}
          size='sm'
          className='mr-2'
          onClick={() => navigate('/search')}
        />
      </nav>

      <PostFeed />
      <TabBar />
    </div>
  )
}

export default HomePage
