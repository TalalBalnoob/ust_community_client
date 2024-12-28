import { faEraser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../components'
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
    console.log(attachment)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', body)
    if (attachment) formData.append('attachment', attachment)

    const res = await axios.post('/posts', formData, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (res.status === 200) navigate('/')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  return (
    <div className='text-right'>
      <nav className='bg-transparent h-14 text-3xl mr-auto flex justify-between items-center'>
        <div className='w-10'></div>
        <h1 className='text-4xl text-center mt-2'>منشور جديد</h1>
        <NavLink
          to='..'
          end
        >
          <Button
            className='text-sm px-2 mx-2 py-1 rounded-sm bg-transparent'
            text={
              <FontAwesomeIcon
                icon={faEraser}
                size='xl'
              />
            }
            type='button'
          />
        </NavLink>
      </nav>
      <form
        className='flex gap-4 flex-col w-3/4 mx-auto mt-4 justify-center items-center'
        onSubmit={handlePostSubmit}
      >
        <label
          htmlFor='title'
          className='text-lg w-full flex flex-col'
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
            className='block text-right w-full rounded bg-zinc-800 px-3 py-1.5 text-base text-zinc-200 outline outline-1 -outline-offset-1 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
          />
        </label>
        <label
          htmlFor='body'
          className='text-lg flex w-full flex-col'
        >
          محتوى المنشور
          <textarea
            name='bdoy'
            id='body'
            rows={3}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='block w-full text-right rounded bg-zinc-800 px-3 py-1.5 text-base text-zinc-200 outline outline-1 -outline-offset-1 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
          />
        </label>
        <label
          htmlFor='attachment'
          className='text-lg flex flex-col'
        >
          اضافة ملحق
          <input
            type='file'
            name='attachment'
            id='attachment'
            onChange={handleFileChange}
            accept='application/pdf, image/png, image/jpeg'
            className='w-full text-right p-1 px-2 focus:outline-none rounded bg-zinc-800 border border-gray-200/10'
          />
        </label>

        <Button
          text='نشر'
          type='submit'
          className='p-2 px-4 mt-4 w-3/4 rounded bg-zinc-600'
        />
      </form>
    </div>
  )
}

export default CreatePostPage
