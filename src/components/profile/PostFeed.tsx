import { useState } from 'react'
import { comment, post } from '../../types/posts.type'
import { RenderContent } from './utilsComponents'

function PostFeed({
  userPosts,
  userComments,
  userBookmarks
}: {
  userPosts: post[]
  userComments: comment[]
  userBookmarks: post[]
}) {
  const [posts] = useState<post[]>(userPosts)
  const [bookmarks] = useState<post[]>(userBookmarks)
  const [comments] = useState<comment[]>(userComments)
  const [, setDummy] = useState(true)
  const [view, setView] = useState<'posts' | 'comments' | 'bookmarks'>('posts')

  const triggerRerender = () => {
    setDummy((v) => !v)
  }

  return (
    <>
      <div className='mx-auto mt-4 flex w-full flex-col justify-end text-right'>
        <div className='flex'>
          <button
            value={'bookmarks'}
            className={`mx-0 h-8 w-full border border-sec/20 ${view === 'bookmarks' ? 'bg-sec/80 text-zinc-100' : 'bg-transparent text-sec'}`}
            onClick={() => setView('bookmarks')}
          >
            المحفوظات
          </button>
          <button
            value={'comments'}
            className={`mx-0 h-8 w-full border border-sec/20 ${view === 'comments' ? 'bg-sec/80 text-zinc-200' : 'bg-transparent text-sec'}`}
            onClick={() => setView('comments')}
          >
            التعليقات
          </button>
          <button
            value={'posts'}
            className={`mx-0 h-8 w-full border border-sec/20 ${view === 'posts' ? 'bg-sec/80 text-zinc-100' : 'bg-transparent text-sec'}`}
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
            bookmarks={bookmarks}
            triggerRerender={triggerRerender}
          />
        </section>
      </div>
    </>
  )
}

export default PostFeed
