import { post } from '../types'

/* -------------------- Tasks -------------------------------- */
// TODO: add profile image
// TODO: add optional image display
// TODO: add title to the post
// TODO: add language detect lib to set the text alignment
/* -------------------- Tasks -------------------------------- */
function Post({ post }: { post: post }) {
  return (
    <div className='h-fit w-full p-3 border-t border-b border-gray-200/10'>
      <div className='flex gap-2'>
        <img
          src={'/public/vite.svg'}
          alt=''
        />
        <div className=''>
          <h4 className='text-white'>{post.user.displayName}</h4>
        </div>
      </div>
      <div>
        {post.attachment_url ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/storage/${post.attachment_url}`}
            alt=''
          />
        ) : (
          ''
        )}
      </div>
      <div className='mt-1'>
        <p className='text-left	leading-7'>{post.body}</p>
      </div>
    </div>
  )
}

export default Post
