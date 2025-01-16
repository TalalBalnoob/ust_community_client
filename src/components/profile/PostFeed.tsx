import { useState } from 'react'
import { comment, post } from '../../types/posts.type'
import { RenderContent } from './utilsComponents'

function PostFeed({
  userPosts,
  userComments,
}: {
  userPosts: post[]
  userComments: comment[]
}) {
  const [posts] = useState<post[]>(userPosts)
  const [comments] = useState<comment[]>(userComments)
  const [, setDummy] = useState(true)
  const [view, setView] = useState<'posts' | 'comments'>('posts')

  const triggerRerender = () => {
    setDummy((v) => !v)
  }

  console.log(comments)

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
          <RenderContent
            view={view}
            posts={posts}
            comments={comments}
            triggerRerender={triggerRerender}
          />
        </section>
      </div>
    </>
  )
}

export default PostFeed
