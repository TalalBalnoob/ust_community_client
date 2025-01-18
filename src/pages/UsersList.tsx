import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLoaderData, useNavigate } from 'react-router-dom'
import UserListUserItem from '../components/profile/UserListUserItem'
import { staff, student, userProfile } from '../types/userProfile.type'

function UserList() {
  const navigate = useNavigate()
  const data = useLoaderData() as userProfile<staff | student>[]
  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <button
          className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
          type='button'
          onClick={() => navigate('..')}
        >
          <FontAwesomeIcon
            icon={faHouse}
            size='xl'
          />
        </button>
      </nav>
      {data.map((userItem) => {
        return (
          <UserListUserItem
            key={userItem.id}
            userData={userItem}
          />
        )
      })}
    </div>
  )
}

export default UserList
