import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar, TopBar } from '../components'
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
      <TopBar
        center={'إنشاء منشور جديد'}
      />
      <form
        className='mx-auto mt-24 flex w-3/4 flex-col items-center justify-center gap-4 lg:w-2/4 xl:w-1/3'
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
            className='block w-full rounded bg-zinc-800 px-3 py-1.5 text-right text-base shadow sm:text-sm/6 input_style'
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
            className='block w-full rounded bg-zinc-800 px-3 py-1.5 text-right text-base shadow sm:text-sm/6 input_style'
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
            className='block w-full rounded px-3 py-1.5 text-right text-base shadow sm:text-sm/6 input_style'
          />
        </label>

        <button
          type='submit'
          className='mt-4 w-3/4 rounded bg-sec/80 text-zinc-200 p-2 px-4'
        >
          نشر
        </button>
        <button
          className='mt-1 w-2/3 rounded bg-transparent text-sec border border-red-300 hover:bg-red-300 p-2 px-4'
          type='button'
          onClick={() => navigate(-1)}
        >
          حذف
        </button>
      </form>
      <TabBar />
    </div>
  )
}

export default CreatePostPage
