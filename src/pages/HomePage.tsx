import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Button, PostFeed } from '../components'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        {/* Filler div to make the layout as |space -- title -- btn| */}
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <Button
          className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
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
