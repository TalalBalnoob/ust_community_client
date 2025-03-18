import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { TopBar } from '../components'
import UserListUserItem from '../components/profile/UserListUserItem'
import { staff, student, userProfile } from '../types/userProfile.type'

function UserList() {
  const navigate = useNavigate()
  const data = useLoaderData() as userProfile<staff | student>[]
  return (
    <div className='h-screen w-screen'>
      <TopBar
        right={
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
        }
      />
      <div className='mx-auto lg:w-1/2 xl:w-1/3'>
        {data.map((userItem) => {
          return (
            <UserListUserItem
              key={userItem.id}
              userData={userItem}
            />
          )
        })}
      </div>
    </div>
  )
}

export default UserList
