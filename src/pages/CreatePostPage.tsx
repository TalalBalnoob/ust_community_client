import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../context/AuthProvider'
import axios from '../utils/api/axios'

function CreatePostPage() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', body)
    if (attachment) formData.append('attachment', attachment)

    const res = await axios.post('/posts', formData, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (res.status === 201) navigate('/')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  return (
    <div className='text-right'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        <div className='w-10'></div>
        <h1 className='mt-2 text-center text-4xl'>منشور جديد</h1>
        <NavLink
          to='..'
          end
        >
          <button
            className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
            type='button'
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              size='xl'
            />
          </button>
        </NavLink>
      </nav>
      <form
        className='mx-auto mt-4 flex w-3/4 flex-col items-center justify-center gap-4 lg:w-2/4'
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
        <label
          htmlFor='attachment'
          className='flex flex-col text-lg'
        >
          اضافة ملحق
          <input
            type='file'
            name='attachment'
            id='attachment'
            onChange={handleFileChange}
            accept='application/pdf, image/png, image/jpeg'
            className='w-full rounded border border-gray-200/10 bg-zinc-800 p-1 px-2 text-right focus:outline-none'
          />
        </label>

        <button
          type='submit'
          className='mt-4 w-3/4 rounded bg-zinc-600 p-2 px-4'
        >
          نشر
        </button>
      </form>
    </div>
  )
}

export default CreatePostPage
