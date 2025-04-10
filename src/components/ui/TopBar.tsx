import { ReactNode } from 'react'

type PropsType = {
  right?: ReactNode
  title?: string
  left?: ReactNode
  className?: string
}

const TopBar = ({ right, title, left, className }: PropsType) => {
  return (
    <nav
      className={`mr-auto flex h-14 w-screen items-center justify-between border-b border-gray-200/10 bg-zinc-900 text-3xl lg:mb-12 ${className}`}
    >
      {left ? left : <div className='w-10'></div>}
      <h1>{title ? title : 'UST-C'}</h1>
      {right ? right : <div className='w-10'></div>}
    </nav>
  )
}

export default TopBar
