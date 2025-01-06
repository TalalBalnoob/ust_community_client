import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'

function NotFoundPage() {
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
              icon={faHouse}
              size='xl'
            />
          }
          type='button'
          onClick={() => navigate('/')}
        />
      </nav>
      <h1 className='flex h-1/2 w-full flex-col items-center justify-center'>
        Page Not Found 😢
      </h1>
    </div>
  )
}

export default NotFoundPage
