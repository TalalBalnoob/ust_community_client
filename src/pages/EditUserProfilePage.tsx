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

      console.log(status, data)

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
        className='mx-auto w-[90%] text-right lg:mx-auto lg:w-1/2 xl:w-1/3'
      >
        <label
          htmlFor='username'
          className='w-3/4 text-lg'
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
          className='w-3/4 text-lg'
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
          className='flex flex-col text-lg'
        >
          صورة شخصية
          <input
            type='file'
            name='attachment'
            id='attachment'
            onChange={handleFileChange}
            accept='application/pdf, image/png, image/jpeg'
            className='w-full rounded border border-gray-200/10 bg-zinc-800 p-1 px-2 text-right focus:outline-none'
          />
        </label>
        <div className='w-full text-center'>
          <button className='mt-4 w-3/4 rounded bg-zinc-600 p-2 px-4'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserProfilePage
