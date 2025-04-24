import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { TopBar } from '../components'
import { getAuth } from '../context/AuthProvider'
import { userProfile } from '../types/userProfile.type'
import { editUserProfile } from '../utils/api/userProfile'

function EditUserProfilePage() {
  const auth = getAuth()
  const navigate = useNavigate()
  const { profile } = useLoaderData() as userProfile
  const [username, setUsername] = useState(profile.displayName ?? '')
  const [bio, setBio] = useState<string>(profile.bio ?? '')
  const [attachment, setAttachment] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('bio', bio)
      if (attachment) formData.append('attachment', attachment)

      const { status, data } = await editUserProfile(formData, auth)

      if (status === 200) navigate('/profile')
      else throw new Error('something went wrong...')
    } catch (e) {
      console.log(e)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  return (
    <div>
      <TopBar className='border-b-transparent' />
      <form
        onSubmit={handleSubmit}
        className='mx-auto mt-24 flex w-3/4 flex-col items-center justify-center gap-4 lg:w-2/4 xl:w-1/3'
      >
        <label
          htmlFor='username'
          className='flex w-full flex-col text-lg items-end'
        >
          اسم المستخدم
          <input
            type='text'
            name='username'
            className='input_style'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label
          htmlFor='description'
          className='flex w-full flex-col text-lg items-end'
        >
          الوصف
          <textarea
            name='description'
            className='input_style'
            rows={4}
            value={bio ?? ''}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label
          htmlFor='attachment'
          className='flex flex-col items-end text-lg'
        >
          صورة شخصية
          <input
            type='file'
            name='attachment'
            id='attachment'
            onChange={handleFileChange}
            accept='application/pdf, image/png, image/jpeg'
            className='block w-full rounded px-3 py-1.5 text-right text-base shadow sm:text-sm/6 input_style'
          />
        </label>
        <div className='w-full text-center'>
          <button
            type='submit'
            className='mt-4 w-3/4 rounded bg-sec/80 text-zinc-200 p-2 px-4'
          >
            حفظ
          </button>
          <button
            className='mt-1 w-2/3 rounded bg-transparent text-sec border border-red-300 hover:bg-red-300 p-2 px-4'
            type='button'
            onClick={() => navigate(-1)}
          >
            تراجع
          </button>
        </div>
      </form>
    </div >
  )
}

export default EditUserProfilePage
