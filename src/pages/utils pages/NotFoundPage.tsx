import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../../components'

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      <TopBar
        right={
          <button
            className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
            type='button'
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon
              icon={faHouse}
              size='xl'
            />
          </button>
        }
      />
      <h1 className='flex h-1/2 w-full flex-col items-center justify-center'>
        Page Not Found 😢
      </h1>
    </div>
  )
}

export default NotFoundPage
