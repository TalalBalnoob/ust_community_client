import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from 'react-avatar'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { ProfilePostFeed } from '../components'
import { logout } from '../context/AuthProvider'
import { staff, student, userProfile } from '../types/userProfile.type'

function CurrentUserProfilePage() {
  const { user_type_id, followers, following } = useLoaderData() as userProfile
  type ProfileType<T extends number> = T extends 1
    ? userProfile<student>
    : T extends 2
      ? userProfile<staff>
      : never
  const { profile, posts, comments } =
    user_type_id === 1
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        (useLoaderData() as ProfileType<1>)
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        (useLoaderData() as ProfileType<2>)
  const navigate = useNavigate()

  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        <button
          className='bg-red-400 p-2 text-lg'
          onClick={async () => {
            if (await logout()) navigate('/login')
          }}
        >
          Logout
        </button>
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
      <main className='m-x-auto mt-6 w-full'>
        <div className='flex w-full justify-end gap-x-3 text-right'>
          <div className='user_info flex flex-col'>
            <h1 className='flex items-baseline gap-x-2 text-2xl'>
              <p className='text-sm text-gray-200/40'>
                {user_type_id === 1
                  ? `Level ${(profile as student).level}`
                  : 'موظف'}
              </p>{' '}
              {profile.displayName}
            </h1>
            <div>
              <h3 className='mt-1'>
                {user_type_id === 1
                  ? (profile as student).major
                  : (profile as staff).role}
              </h3>
            </div>
            <div className='mt-auto flex'>
              {/* TODO: Add a btn that show the followers and the following */}
              <div className='mr-auto'>المتابعين {followers}</div>
              <div>المتابعين {following}</div>
            </div>
          </div>
          {/* FIXME: make the img work */}
          {true ? (
            <img
              src={'/vite.svg'}
              alt=''
              className='size-24 rounded-md'
            />
          ) : (
            <Avatar
              name={`${profile.displayName}`}
              size='100'
              round={'100px'}
            />
          )}
        </div>

        <div className='my-6 flex flex-col items-end'>
          {profile.bio ? (
            <p>{profile.bio}</p>
          ) : (
            <p className='mx-auto text-gray-200/30'>لا يوجد وصف</p>
          )}
        </div>
        <ProfilePostFeed
          userPosts={posts}
          userComments={comments}
        />
      </main>
    </div>
  )
}

export default CurrentUserProfilePage
