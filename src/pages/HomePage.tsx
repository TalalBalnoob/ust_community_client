import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { MobileTabBar, PostFeed } from '../components'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-zinc-900 text-3xl'>
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
      <MobileTabBar />
    </div>
  )
}

export default HomePage
