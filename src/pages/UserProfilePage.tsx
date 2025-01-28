import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from 'react-avatar'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { MobileTabBar, ProfilePostFeed } from '../components'
import useAuth from '../context/AuthProvider'
import { staff, student, userProfile } from '../types/userProfile.type'

function CurrentUserProfilePage() {
  const { auth } = useAuth()
  const { user_type_id, id, followers, following } =
    useLoaderData() as userProfile
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
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <div className='w-10'></div>
      </nav>
      <main className='m-x-auto mt-3 w-full'>
        <div className='flex w-full justify-end gap-x-3 text-right'>
          <div className='user_info flex flex-col'>
            <h1 className='flex items-baseline gap-x-2 text-2xl'>
              {id === auth.userData.id ? (
                <button className=''>
                  <FontAwesomeIcon
                    size='sm'
                    icon={faPen}
                  />
                </button>
              ) : (
                ''
              )}
              <p className='text-sm text-gray-200/40'>
                {user_type_id === 1
                  ? `مستوى ${(profile as student).level}`
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
              <div
                className='ml-auto mr-6'
                onClick={() => {
                  navigate(`/users/${id}/followers`)
                }}
              >
                متابعين {followers}
              </div>
              <div
                onClick={() => {
                  navigate(`/users/${id}/followings`)
                }}
              >
                متابعة {following}
              </div>
            </div>
          </div>
          <div className='mr-2'>
            {profile.imageUrl ? (
              <img
                src={'/vite.svg'}
                alt=''
                className='size-24 rounded-md'
              />
            ) : (
              // TODO: replace the img lib
              <Avatar
                name={`${profile.displayName}`}
                size='100'
                round={'6px'}
              />
            )}
          </div>
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
      <MobileTabBar />
    </div>
  )
}

export default CurrentUserProfilePage
