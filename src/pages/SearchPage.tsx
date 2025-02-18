import { useRef, useState } from 'react'
import { MobileTabBar, SearchFeed } from '../components'
import useAuth from '../context/AuthProvider'
import { post } from '../types/posts.type'
import { staff, student, userProfile } from '../types/userProfile.type'
import { search } from '../utils/api/search'

function SearchPage() {
  const { auth } = useAuth()

  const [posts, setPosts] = useState<post[]>([])
  const [usersList, setUsersList] = useState<userProfile<student | staff>[]>()

  const searchRef = useRef<HTMLInputElement>(null)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchRef.current?.value) {
      const res = await search(searchRef.current.value, auth)
      console.log(res)

      setPosts(res.data.posts)
      setUsersList(res.data.users)
    }
  }

  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-zinc-900 text-3xl'>
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <div className='w-10'></div>
      </nav>
      <main>
        <form
          action=''
          onSubmit={(e) => submitHandler(e)}
        >
          <label
            htmlFor='search'
            className='mx-auto mt-0 block w-5/6'
          >
            <h1 className='text-right text-xl'>البحث</h1>
            <input
              className='input_style'
              type='text'
              ref={searchRef}
              name='search'
              id='search'
              placeholder='عن ماذا تبحث؟'
              autoComplete='off'
              required
            />
          </label>
        </form>
        {usersList && posts ? (
          <SearchFeed
            usersList={usersList}
            userPosts={posts}
          />
        ) : (
          ''
        )}
      </main>
      <MobileTabBar />
    </div>
  )
}

export default SearchPage
