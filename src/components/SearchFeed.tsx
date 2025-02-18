import { useState } from 'react'
import { post } from '../types/posts.type'
import { staff, student, userProfile } from '../types/userProfile.type'
import { RenderContent } from './profile/utilsComponents'

function SearchFeed({
  userPosts,
  usersList,
}: {
  userPosts: post[]
  usersList: userProfile<student | staff>[]
}) {
  const [posts] = useState<post[]>(userPosts)
  const [users] = useState<userProfile<student | staff>[]>(usersList)
  const [, setDummy] = useState(true)
  const [view, setView] = useState<'posts' | 'users'>('posts')

  const triggerRerender = () => {
    setDummy((v) => !v)
  }

  return (
    <>
      <div className='mx-auto mt-4 flex w-full flex-col justify-end text-right'>
        <div className='flex'>
          <button
            value={'comments'}
            className={`mx-0 h-8 w-full border border-gray-200/30 ${view === 'users' ? 'bg-zinc-200 text-zinc-900' : 'bg-transparent text-white'}`}
            onClick={() => setView('users')}
          >
            حسابات
          </button>
          <button
            value={'posts'}
            className={`mx-0 h-8 w-full border border-gray-200/30 ${view === 'posts' ? 'bg-zinc-200 text-zinc-900' : 'bg-transparent text-white'}`}
            onClick={() => setView('posts')}
          >
            المنشورات
          </button>
        </div>

        <section>
          <RenderContent
            view={view}
            posts={posts}
            users={users}
            triggerRerender={triggerRerender}
          />
        </section>
      </div>
    </>
  )
}

export default SearchFeed
