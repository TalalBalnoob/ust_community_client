import { ReactNode } from 'react'

type PropsType = {
  right?: ReactNode
  center?: ReactNode
  left?: ReactNode
  className?: string
}

const TopBar = ({ right, center, left, className }: PropsType) => {
  return (
    <nav
      className={`mr-auto fixed top-0 px-10 flex h-14 w-screen items-center justify-between border-b border-gray-200/10 bg-primary text-3xl 
                  text-white ${className}`}
    >
      {left ? left : <div className='w-10'></div>}
      {center ? center : <div className='w-10'></div>}
      {right ? right : <div className='w-10'></div>}
    </nav>
  )
}

export default TopBar
