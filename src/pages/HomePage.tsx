import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Button, PostFeed } from '../components'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen'>
      <nav className='bg-transparent 50 h-14 text-3xl mr-auto flex justify-between items-center'>
        {/* Filler div to make the layout as |space -- title -- btn| */}
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <Button
          className='text-sm px-2 mx-2 py-1 rounded-sm bg-transparent'
          text={
            <FontAwesomeIcon
              icon={faPenToSquare}
              size='xl'
            />
          }
          type='button'
          onClick={() => navigate('/create')}
        />
      </nav>
      <PostFeed />
    </div>
  )
}

export default HomePage
