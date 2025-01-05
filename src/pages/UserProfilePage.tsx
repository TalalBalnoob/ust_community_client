import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from 'react-avatar'
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { Button } from '../components'
import { getAuth } from '../context/AuthProvider'
import { staff, student, userProfile } from '../types'
import { fetchUserProfile } from '../utils/api/fetchMethods'

function UserProfilePage() {
  const { username, user_type_id } = useLoaderData() as userProfile
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

  return (
    <div className='w-screen h-screen'>
      <nav className='bg-transparent h-14 text-3xl mr-auto flex justify-between items-center'>
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
          onClick={() => navigate('..')}
        />
      </nav>
      <main className='w-[97%] m-x-auto'>
        <div className='flex gap-x-3 text-right float-right'>
          <div className='user_info flex flex-col'>
            <h1 className='text-2xl flex items-baseline gap-x-2'>
              <p className='text-sm text-gray-200/40'>
                {user_type_id === 1
                  ? `Level ${(profile as student).level}`
                  : 'موظف'}
              </p>{' '}
              {profile.displayName}
            </h1>
            <div>
              <h3 className='mt-2'>
                {user_type_id === 1
                  ? (profile as student).major
                  : (profile as staff).role}
              </h3>
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
