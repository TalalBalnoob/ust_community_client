import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostFeed } from '../components'

function HomePage() {
  return (
    <div className='w-screen h-screen'>
      <nav className='bg-transparent 50 h-14 text-3xl mr-auto flex justify-between items-center'>
        {/* Filler div to make the layout as |space -- title -- btn| */}
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <button className='text-sm px-2 py-1 rounded-sm bg-transparent'>
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
