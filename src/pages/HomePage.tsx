import { faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { PostFeed } from '../components'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        <button
          className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
          type='button'
          onClick={() => navigate('/profile')}
        >
          <FontAwesomeIcon
            icon={faUser}
            size='xl'
          />
        </button>
        <h1>UST-C</h1>
        <button
          className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
          type='button'
          onClick={() => navigate('/create')}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            size='xl'
          />
        </button>
      </nav>
      <PostFeed />
    </div>
  )
}

export default HomePage
