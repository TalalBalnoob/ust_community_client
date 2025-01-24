import { MobileTabBar, PostFeed } from '../components'

function HomePage() {
  return (
    <div className='h-screen w-screen'>
      <nav className='mr-auto flex h-14 items-center justify-between bg-zinc-900 text-3xl'>
        <div className='w-10'></div>
        <h1>UST-C</h1>
        <div className='w-10'></div>
      </nav>
      <PostFeed />
      <MobileTabBar />
    </div>
  )
}

export default HomePage
