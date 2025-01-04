import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen'>
      <nav className='bg-transparent h-14 text-3xl mr-auto flex justify-between items-center'>
        {/* Filler div to make the layout as |space -- title -- btn| */}
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <Button
          className='text-sm px-2 mx-2 py-1 rounded-sm bg-transparent'
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
      <h1 className='flex flex-col justify-center items-center h-1/2 w-full'>
        Page Not Found 😢
      </h1>
    </div>
  )
}

export default NotFoundPage
