import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/AuthProvider'
import { staff, student, userProfile } from '../../types/userProfile.type'

function UserListUserItem({
  userData,
}: {
  userData: userProfile<student | staff>
}) {
  const navigate = useNavigate()
  const { auth } = useAuth()
  return (
    <div className='h-fit w-full border-b border-t border-gray-200/10 p-3 lg:border-x'>
      {/* User top info */}
      <div
        className='flex w-fit cursor-default items-start gap-2'
        onClick={() => {
          if (userData.id === auth.userData.id) navigate('/profile')
          else navigate(`/users/${userData.id}`)
        }}
      >
        {/* User Image */}
        {userData.profile.imageUrl ? (
          <img
            src={userData.profile.imageUrl}
            alt=''
            className='size-9 rounded-md'
          />
        ) : (
          <Avatar
            name={`${userData.profile.displayName}`}
            size='36'
            round={'6px'}
          />
        )}
        {/* User name */}
        <div className='flex items-baseline gap-2'>
          <h4 className='text-white'>{userData.profile.displayName}</h4>
        </div>
      </div>
    </div>
  )
}

export default UserListUserItem
