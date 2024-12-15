import { PostFeed } from '../components'

function HomePage() {
  return (
    <div className='w-screen h-screen'>
      <nav className='bg-transparent 50 h-14 text-3xl flex justify-center items-center'>
        <h1>UST-C</h1>
      </nav>
      <PostFeed />
    </div>
  )
}

export default HomePage
