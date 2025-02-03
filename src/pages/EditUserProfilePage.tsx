import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { userProfile } from '../types/userProfile.type'

function EditUserProfilePage() {
  const { profile } = useLoaderData() as userProfile
  const [username, setUsername] = useState(profile.displayName ?? '')
  const [bio, setBio] = useState<string>(profile.bio ?? '')
  const [attachment, setAttachment] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('User Profile Updated:', { username, bio, attachment })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  return (
    <div>
      <nav className='mr-auto flex h-14 items-center justify-between bg-zinc-900 text-3xl'>
        <div></div>
        <h1 className='mx-auto'>UST-C</h1>
        <div></div>
      </nav>
      <form
        onSubmit={handleSubmit}
        className='mx-auto w-[90%] text-right'
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
        <button>Save</button>
      </form>
    </div>
  )
}

export default EditUserProfilePage
