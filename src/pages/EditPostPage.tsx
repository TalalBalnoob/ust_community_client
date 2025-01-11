import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useEffect, useState } from 'react'
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom'
import useAuth from '../context/AuthProvider'
import { post } from '../types/posts.type'
import { deletePost } from '../utils/api/delete'
import { editPost } from '../utils/api/fetchPosts'

function EditPostPage() {
  const post = useLoaderData() as post
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { postID } = useParams()
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    setTitle(() => post.title ?? '')
    setBody(() => post.body)
  }, [post.body, post.title])

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await editPost(postID as string, auth, { title, body })
    if (res.status === 200) navigate('/')
  }

  async function handleDeletePost() {
    const confirmation = confirm('هل انت متأكد من حذف المنشور؟')
    if (!confirmation) return 0

    const res = await deletePost(postID as string, auth)

    if (res.status === 200) {
      return navigate('..')
    }
  }

  return (
    <div className='text-right'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        <div className='w-10'></div>
        <h1 className='mt-2 text-center text-4xl'>تعديل المنشور</h1>
        <NavLink
          to='..'
          end
        >
          <button
            className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
            type='button'
          >
            <FontAwesomeIcon
              icon={faHome}
              size='xl'
            />
          </button>
        </NavLink>
      </nav>
      <form
        className='mx-auto mt-4 flex w-3/4 flex-col items-center justify-center gap-4'
        onSubmit={handlePostSubmit}
      >
        <label
          htmlFor='title'
          className='flex w-full flex-col text-lg'
        >
          عنوان المنشور
          <input
            type='text'
            name='title'
            id='title'
            autoComplete='off'
            size={30}
            max={30}
            placeholder='العنوان'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='block w-full rounded bg-zinc-800 px-3 py-1.5 text-right text-base text-zinc-200 outline outline-1 -outline-offset-1 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
          />
        </label>
        <label
          htmlFor='body'
          className='flex w-full flex-col text-lg'
        >
          محتوى المنشور
          <textarea
            name='bdoy'
            id='body'
            rows={3}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='block w-full rounded bg-zinc-800 px-3 py-1.5 text-right text-base text-zinc-200 outline outline-1 -outline-offset-1 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
          />
        </label>
        <button
          type='submit'
          className='mt-4 w-3/4 rounded bg-zinc-600 p-2 px-4'
        >
          نشر
        </button>
        <button
          type='button'
          className='mt-4 w-3/4 rounded bg-red-800 p-2 px-4 focus:bg-red-700'
          onClick={handleDeletePost}
        >
          حذف المنشور
        </button>
      </form>
    </div>
  )
}

export default EditPostPage
