import { useState, useRef, ReactNode } from "react"
import useAuth from "../context/AuthProvider"
import { post } from "../types/posts.type"
import { userProfile, student, staff } from "../types/userProfile.type"
import { search } from "../utils/api/search"

function SearchInput({ label, className }: { label?: ReactNode, className?: string }) {
  const { auth } = useAuth()
  const [posts, setPosts] = useState<post[]>([])
  const [usersList, setUsersList] = useState<userProfile<student | staff>[]>()

  const searchRef = useRef<HTMLInputElement>(null)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchRef.current?.value) {
      const res = await search(searchRef.current.value, auth)

      setPosts(res.data.posts)
      setUsersList(res.data.users)
    }
  }

  return (
    <form
      action=''
      onSubmit={(e) => submitHandler(e)}
    >
      <label
        htmlFor='search'
        className='mx-auto mt-0 block w-5/6'
      >
        {label}
      </label>
      <input
        className={`input_style ${className}`}
        type='text'
        ref={searchRef}
        name='search'
        id='search'
        placeholder='عن ماذا تبحث؟'
        autoComplete='off'
        required
      />
    </form>
  )
}

export default SearchInput
