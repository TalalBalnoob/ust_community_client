import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useEffect, useState } from 'react'
import {
  LoaderFunctionArgs,
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Button } from '../components'
import useAuth, { getAuth } from '../context/AuthProvider'
import { post } from '../types'
import axios from '../utils/api/axios'
import { fetchOnePost } from '../utils/api/fetchMethods'

function EditPostPage() {
  const post = useLoaderData() as post
  const { auth } = useAuth()
  const navigate = useNavigate()
  let { postID } = useParams()
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    setTitle(() => post.title ?? '')
    setBody(() => post.body)
  }, [])

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await axios.put(
      `/posts/${postID}`,
      { title, body },
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      },
    )

    if (res.status === 200) navigate('/')
  }

  async function handleDeletePost() {
    const confirmation = confirm('هل انت متأكد من حذف المنشور؟')
    if (!confirmation) return 0

    const res = await axios.delete(`/posts/${postID}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (res.status === 200) {
      return navigate('..')
    }
  }

  return (
    <div className='text-right'>
      <nav className='bg-transparent h-14 text-3xl mr-auto flex justify-between items-center'>
        <div className='w-10'></div>
        <h1 className='text-4xl text-center mt-2'>تعديل المنشور</h1>
        <NavLink
          to='..'
          end
        >
          <Button
            className='text-sm px-2 mx-2 py-1 rounded-sm bg-transparent'
            text={
              <FontAwesomeIcon
                icon={faHome}
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
            className='block text-right w-full rounded bg-zinc-800 px-3 py-1.5
						 					 text-base text-zinc-200 outline outline-1 -outline-offset-1
						 				 outline-zinc-700 placeholder:text-gray-400 focus:outline
							 				 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500
										   sm:text-sm/6'
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
            className='block w-full text-right rounded bg-zinc-800 px-3 py-1.5
											 text-base text-zinc-200 outline outline-1 -outline-offset-1
										 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 
										 	 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
          />
        </label>
        <Button
          text='نشر'
          type='submit'
          className='p-2 px-4 mt-4 w-3/4 rounded bg-zinc-600'
        />
        <Button
          text='حذف المنشور'
          type='button'
          className='p-2 px-4 mt-4 w-3/4 rounded bg-red-800 focus:bg-red-700'
          onClick={handleDeletePost}
        />
      </form>
    </div>
  )
}

export default EditPostPage

export const editPostLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<post> => {
  const { postID } = params
  const auth = getAuth()

  const { data } = await fetchOnePost(Number(postID), auth)

  return data.data
}
