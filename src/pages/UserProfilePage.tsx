import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Avatar from 'react-avatar'
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { Button, PostFeed } from '../components'
import { getAuth } from '../context/AuthProvider'
import { staff, student, userProfile } from '../types'
import { fetchUserProfile } from '../utils/api/fetchMethods'

function UserProfilePage() {
  const { user_type_id, followers, following } = useLoaderData() as userProfile
  type ProfileType<T extends number> = T extends 1
    ? userProfile<student>
    : T extends 2
      ? userProfile<staff>
      : never
  const { profile } =
    user_type_id === 1
      ? (useLoaderData() as ProfileType<1>)
      : (useLoaderData() as ProfileType<2>)
  const navigate = useNavigate()
  const [view, setView] = useState<'posts' | 'comments'>('posts')

  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
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
          onClick={() => navigate('..')}
        />
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

        <div className='mx-auto mt-4 flex w-full flex-col justify-end text-right'>
          <div className='flex'>
            <button
              value={'comments'}
              className='mx-0 h-8 w-full border border-gray-200/30'
              onClick={() => setView('comments')}
            >
              التعليقات
            </button>
            <button
              value={'posts'}
              className='mx-0 h-8 w-full border border-gray-200/30'
              onClick={() => setView('posts')}
            >
              المنشورات
            </button>
          </div>

          <section>
            {/* TODO: Make custom feed for the user profile  */}
            {view === 'posts' ? <PostFeed /> : <h1>لا يوجد تعليقات</h1>}
          </section>
        </div>
      </main>
    </div>
  )
}

export default UserProfilePage

export const userProfileLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<userProfile> => {
  const { userID } = params
  const auth = getAuth()

  const res = await fetchUserProfile(userID as string, auth)

  return res.data.user
}
