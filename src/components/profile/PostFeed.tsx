import { useState } from 'react'
import { comment, post } from '../../types/posts.type'
import Post from '../posts/Post'

function PostFeed({
  userPosts,
}: {
  userPosts: post[]
  userComments?: comment[]
}) {
  const [posts] = useState<post[]>(userPosts)
  const [, setDummy] = useState(true)
  const [view, setView] = useState<'posts' | 'comments'>('posts')

  const triggerRerender = () => {
    setDummy((v) => !v)
  }

  return (
    <>
      <div className='mx-auto mt-4 flex w-full flex-col justify-end text-right'>
        <div className='flex'>
          <button
            value={'comments'}
            className='mx-0 h-8 w-full border border-gray-200/30'
            onClick={() => setView('comments')}
          >
            التعليقات
          </button>
          <button
            value={'posts'}
            className='mx-0 h-8 w-full border border-gray-200/30'
            onClick={() => setView('posts')}
          >
            المنشورات
          </button>
        </div>

        <section>
          {view === 'posts' ? (
            posts.map((post) => (
              <Post
                post={post}
                key={post.id}
                triggerRerender={triggerRerender}
              />
            ))
          ) : (
            <h1>لا يوجد تعليقات</h1>
          )}
        </section>
      </div>
    </>
  )
}

export default PostFeed
