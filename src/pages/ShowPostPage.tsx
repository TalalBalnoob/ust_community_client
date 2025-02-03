import { faComment } from '@fortawesome/free-regular-svg-icons'
import {
  faHouse,
  faPen,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import Avatar from 'react-avatar'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Comment, LikeBtn, PrivateComponent } from '../components'
import useAuth from '../context/AuthProvider'
import { comment, post } from '../types/posts.type'
import axios from '../utils/api/axios'
import { deleteComment } from '../utils/api/delete'
import { likePost, unlikePost } from '../utils/api/likes'
import { timeAgo } from '../utils/date'

function ShowPostPage() {
  const { post, comments } = useLoaderData() as {
    post: post
    comments: comment[]
  }
  const navigate = useNavigate()
  const [, setDummy] = useState(true)
  const [comment, setComment] = useState<comment[]>(comments)
  const [commentBody, setCommentBody] = useState<string>('')
  const { postID } = useParams()

  const { auth } = useAuth()

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      console.log('hi i am here')
      const res = await axios.post(
        `/posts/${post.id}/comments`,
        { body: commentBody },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        },
      )

      if (res.status === 201) {
        setComment((prevComments) => [...prevComments, res.data])
        setCommentBody('')
      } else {
        console.error('Error submitting the comment')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function handleLikeToggle() {
    if (!post) return 0

    if (!post.isLiked) {
      const { status } = await likePost(post.id, auth)

      if (status === 200) {
        post.isLiked = true
        post.likes++
        setDummy((v) => !v)
      }
    } else if (post.isLiked) {
      const { status } = await unlikePost(post.id, auth)

      if (status === 200) {
        post.isLiked = false
        post.likes--
        setDummy((v) => !v)
      }
    }
  }

  async function handleDeleteComment(commentID: number) {
    const confirmation = confirm('هل انت متأكد من حذف التعليق؟')
    if (!confirmation) return 0

    const res = await deleteComment(
      postID as string,
      commentID.toString(),
      auth,
    )

    if (res.status === 200) {
      setComment((comment) => comment.filter((com) => com.id !== commentID))
    }
  }

  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-transparent text-3xl'>
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <button
          className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
          type='button'
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon
            icon={faHouse}
            size='xl'
          />
        </button>
      </nav>

      <main>
        <div className='h-fit w-full border-b border-t border-gray-200/10 p-3'>
          {/* User top info */}
          <div className='flex items-start gap-2'>
            {/* User Image */}
            {post?.user.imageUrl ? (
              <img
                src={post?.user.imageUrl}
                alt=''
                className='size-9 rounded-md'
              />
            ) : (
              <Avatar
                name={`${post?.user.displayName}`}
                size='36'
                round={'6px'}
              />
            )}
            {/* User name */}
            <div className='flex items-baseline gap-2'>
              <h4 className='text-white'>{post?.user.displayName}</h4>
              <p className='text-sm text-white/50'>
                {post ? timeAgo(post?.created_at as string) : ''}
              </p>
            </div>
          </div>
          {/* Post Body */}
          <div className='mt-1'>
            <div className='my-2'>
              <p className='text-left leading-7'>{post?.body}</p>
            </div>
            <div>
              {post?.attachment_url ? (
                <img
                  className='rounded'
                  src={`${import.meta.env.VITE_BASE_URL}/storage/${post.attachment_url}`}
                  alt=''
                />
              ) : (
                ''
              )}
            </div>
          </div>
          {/* Post interactions */}
          <div className='mt-2 flex justify-around'>
            {/* Like btn */}
            <LikeBtn
              likes={post?.likes as number}
              isLiked={post?.isLiked as boolean}
              onClick={handleLikeToggle}
            />
            {/* Comment btn */}
            <button className='flex items-center gap-1'>
              <FontAwesomeIcon
                icon={faComment}
                className='text-zinc-400'
              />
              <p className='text-sm'>{post?.comments.length}</p>
            </button>
            <button className='flex items-center gap-1'>
              <FontAwesomeIcon
                icon={faShareSquare}
                className='text-zinc-400'
              />
            </button>
            <PrivateComponent
              ownerId={post?.user_id as number}
              component={
                <button
                  className='flex items-center gap-1'
                  onClick={() => navigate(`/posts/${postID}/edit`)}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className='text-zinc-400'
                  />
                </button>
              }
            />
          </div>
        </div>
      </main>
      <div>
        <form
          method='post'
          className='mt-2'
          onSubmit={handleFormSubmit}
        >
          <textarea
            name=''
            id=''
            placeholder='اكتب تعليقك هنا'
            className='w-full rounded bg-zinc-800 px-3 py-1.5 text-right text-base text-zinc-200 outline outline-1 -outline-offset-1 outline-zinc-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-500 sm:text-sm/6'
            rows={3}
            required
            onChange={(e) => setCommentBody(e.target.value)}
            value={commentBody}
          ></textarea>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='m-2 h-fit rounded bg-zinc-600 p-2 px-4'
            >
              نشر
            </button>
            <h2 className='mx-2 mb-3 mt-6 text-right text-xl'>
              {comment.length} التعليقات
            </h2>
          </div>
        </form>
      </div>
      {comment.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            handleDeleteComment={handleDeleteComment}
          />
        )
      })}
    </div>
  )
}

export default ShowPostPage
