import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from 'react-avatar'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { ProfilePostFeed, TabBar, TopBar } from '../components'
import useAuth, { logout } from '../context/AuthProvider'
import {
  ProfileType,
  staff,
  student,
  userProfile,
} from '../types/userProfile.type'
import { LogOut, Pen } from 'lucide-react'
import { followUser, unFollowUser } from '../utils/api/following'
import { useState } from 'react'

function CurrentUserProfilePage() {
  const { auth } = useAuth()
  const { user_type_id, id, followers, following, isFollowed } =
    useLoaderData() as userProfile

  const { profile, posts, comments, bookmarks } =
    user_type_id === 1
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
      (useLoaderData() as ProfileType<1>)
      : // eslint-disable-next-line react-hooks/rules-of-hooks
      (useLoaderData() as ProfileType<2>)
  const navigate = useNavigate()
  const [isUserFollowd, setIsUserFollowed] = useState(isFollowed);


  return (
    <div className='h-screen w-screen'>
      <TopBar
      />
      <main className='m-x-auto mt-3 lg:mt-24 w-full lg:mx-auto lg:w-1/2 xl:w-3/5'>
        <div>

          <div className='flex w-full justify-end gap-x-3 text-right'>
            <div className='user_info flex flex-col'>
              <h1 className='flex items-center justify-end gap-x-1 text-2xl'>
                {id === auth.userData.id ? (
                  <div className='flex justify-center'>
                    <button
                      className='mr-2 hidden lg:block'
                      onClick={async () => {
                        logout()
                        navigate('/login')
                      }}
                    >
                      <LogOut strokeWidth={3} color='#71717a' />
                    </button>
                    <button
                      className='mr-2 hidden lg:block'
                      onClick={() => navigate('/profile/edit')}
                    >
                      <Pen strokeWidth={3} color="#71717a" />
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {profile.displayName}
              </h1>
              <div>
                <h3 className='mt-1'>
                  {user_type_id === 1
                    ? (profile as student).major
                    : (profile as staff).role}
                </h3>
                <p className='text-sm text-sec/80'>
                  {user_type_id === 1
                    ? `مستوى ${(profile as student).level}`
                    : 'موظف'}
                </p>{' '}
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
                  src={`${import.meta.env.VITE_BASE_URL}/storage/${profile.imageUrl}`}
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


          {id !== auth.userData.id ? (
            <div>
              {isUserFollowd ?
                <button onClick={() => {
                  unFollowUser(auth, profile.user_id)
                  setIsUserFollowed(false)
                }} className='border border-primary text-primary p-2 text-md px-4 rounded'>الغاء المتابعة</button>
                :
                <button onClick={() => {
                  followUser(auth, profile.user_id)
                  setIsUserFollowed(true)
                }} className='bg-primary text-white p-2 text-lg px-4 rounded'>تابع</button>
              }
            </div>) : ""}
        </div>
        <div className='my-6 flex flex-col items-end'>
          {profile.bio ? (
            <p>{profile.bio}</p>
          ) : (
            <p className='mx-auto text-gray-800/60'>لا يوجد وصف</p>
          )}
        </div>
        <ProfilePostFeed
          userPosts={posts}
          userComments={comments}
          userBookmarks={bookmarks}
        />
      </main>
      <TabBar />
    </div>
  )
}

export default CurrentUserProfilePage
