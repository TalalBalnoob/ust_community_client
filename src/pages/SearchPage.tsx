import { useRef } from 'react'
import { MobileTabBar } from '../components'
import useAuth from '../context/AuthProvider'
import { search } from '../utils/api/search'

function SearchPage() {
  const { auth } = useAuth()
  const searchRef = useRef<HTMLInputElement>(null)
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchRef.current) {
      console.log(await search(searchRef.current.value, auth))
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
            className='mx-auto mt-10 block w-5/6'
          >
            <h1 className='text-right text-xl'>البحث</h1>
            <input
              className='w-full border border-gray-200/10 bg-zinc-800 p-1 px-2 text-right focus:outline-none'
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
      </main>
      <MobileTabBar />
    </div>
  )
}

export default SearchPage
