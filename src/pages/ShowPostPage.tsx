import { faComment } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faPen,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Comment, LikeBtn, PrivateComponent, TopBar } from '../components'
import useAuth from '../context/AuthProvider'
import { comment, post } from '../types/posts.type'
import axios from '../utils/api/axios'
import { deleteComment } from '../utils/api/delete'
import { likePost, unlikePost } from '../utils/api/likes'
import { timeAgo } from '../utils/date'
import useLanguageDetection from '../utils/lang/LanguageDetector'

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

  const { detectedLanguage, detectLanguage } = useLanguageDetection()

  const { auth } = useAuth()

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    try {
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

  useEffect(() => {
    // detect the body language
    detectLanguage(post.body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='h-screen w-screen'>
      <TopBar
        right={
          <button
            className='mx-2 rounded-sm bg-transparent px-2 py-1 text-sm'
            type='button'
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              size='xl'
            />
          </button>
        }
      />

      <main className='w-1/2 lg:mx-auto lg:mt-24 lg:w-1/2 xl:w-1/3'>
        <div className='h-fit w-full border-b border-t bg-slate-50 border-gray-200/10 p-3 lg:border-x'>
          {/* User top info */}
          <div
            className='flex w-full items-center justify-end gap-2'
            onClick={() => {
              if (post.user_id === auth.userData.id) navigate('/profile')
              else navigate(`/users/${post.user_id}`)
            }}
          >
            {/* User name */}
            <div className='flex items-baseline gap-2'>
              <p className='text-sm '>
                {post ? timeAgo(post?.created_at as string) : ''}
              </p>
              <h4 className='xl:text-lg'>
                {post?.profile.displayName}
              </h4>
            </div>
            {/* User Image */}
            {post?.profile.imageUrl ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${post?.profile.imageUrl}`}
                alt=''
                className='size-10 rounded-md'
              />
            ) : (
              <Avatar
                name={`${post?.profile.displayName}`}
                size='42'
                round={'6px'}
              />
            )}
          </div>
          {/* Post Body */}
          <div className='mt-1'>
            {/* post body text */}
            {post.title ? (
              <h1
                className='mb-3 mt-2.5 text-xl text-sec/90 xl:text-2xl'
                style={{
                  textAlign: detectedLanguage === 'arb' ? 'right' : 'left',
                }}
              >
                {post.title}
              </h1>
            ) : (
              ''
            )}
            <div className='my-3'>
              <p
                className='text-left text-sm leading-6 text-sec/[0.95] xl:text-base'
                // set the text align based the the language
                style={{
                  textAlign: detectedLanguage === 'arb' ? 'right' : 'left',
                }}
              >
                {post.body}
              </p>
            </div>

            <div>
              {post?.attachment_url ? (
                <img
                  className='size-fit rounded'
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
                className='text-sec/80'
              />
              <p className='text-sm'>{post?.comments.length}</p>
            </button>
            <button className='flex items-center gap-1'>
              <FontAwesomeIcon
                icon={faShareSquare}
                className='text-sec/80'
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
                    className='text-sec/80'
                  />
                </button>
              }
            />
          </div>
        </div>
      </main>
      <div className='lg:mx-auto lg:w-1/2 xl:w-1/3'>
        <form
          method='post'
          className='mt-2'
          onSubmit={handleFormSubmit}
        >
          <textarea
            name=''
            id=''
            placeholder='اكتب تعليقك هنا'
            className='input_style'
            rows={3}
            required
            onChange={(e) => setCommentBody(e.target.value)}
            value={commentBody}
          ></textarea>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className=' rounded bg-sec/80 text-zinc-200 p-2 px-4'
            >
              نشر
            </button>
            <h2 className='mx-2 mb-3 mt-6 text-right text-xl'>
              {comment.length} التعليقات
            </h2>
          </div>
        </form>
      </div>
      <div className='lg:mx-auto lg:w-1/2 xl:w-1/3'>
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
    </div>
  )
}

export default ShowPostPage
