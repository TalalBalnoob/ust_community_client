import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { TopBar } from '../components'
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
    if (res.status === 200) navigate(`/posts/${postID}`)
  }

  async function handleDeletePost() {
    const confirmation = confirm('هل انت متأكد من حذف المنشور؟')
    if (!confirmation) return 0

    const res = await deletePost(postID as string, auth)

    if (res.status === 200) {
      return navigate(`..`)
    }
  }

  return (
    <div className='text-right'>
      <TopBar
        center={'تعديل المنشور'}
        right={
          <button
            className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
            onClick={() => navigate(-1)}
            type='button'
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              size='xl'
            />
          </button>
        }
      />
      <form
        className='mx-auto mt-24 flex w-3/4 flex-col items-center justify-center gap-4 lg:w-1/2'
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
            className='
          block w-full rounded bg-zinc-800 px-3 py-1.5 text-right text-base shadow sm:text-sm/6 input_style
          '
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
        <button
          type='submit'
          className='mt-4 w-3/4 rounded bg-sec/80 text-zinc-200 p-2 px-4'
        >
          تعديل
        </button>
        <button
          type='button'
          className='mt-1 w-2/3 rounded bg-transparent text-sec border border-red-300 hover:bg-red-300 p-2 px-4'
          onClick={handleDeletePost}
        >
          حذف المنشور
        </button>
      </form>
    </div>
  )
}

export default EditPostPage
