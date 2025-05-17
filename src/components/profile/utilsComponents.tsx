import { comment, post } from '../../types/posts.type'
import { staff, student, userProfile } from '../../types/userProfile.type'
import Post from '../posts/Post'
import CustomProfileComment from './CustomProfileComment'
import UserListUserItem from './UserListUserItem'

type RenderContentPopsType = {
  posts: post[]
  triggerRerender: () => void
  comments?: comment[]
  users?: userProfile<student | staff>[]
  bookmarks?: post[]
  view: 'posts' | 'comments' | 'users' | 'bookmarks'
}

export const RenderPosts = ({
  posts,
  triggerRerender,
}: {
  posts: post[]
  triggerRerender: () => void
}) => {
  if (posts.length > 0) {
    return posts.map((post) => (
      <Post
        post={post}
        key={post.id}
        triggerRerender={triggerRerender}
      />
    ))
  }
  return <h1 className='mt-20 text-center'>لم يتم العثور على اي منشورات</h1>
}


export const RenderBookmarks = ({
  bookmarks,
  triggerRerender,
}: {
  bookmarks: post[]
  triggerRerender: () => void
}) => {
  if (bookmarks.length > 0) {
    return bookmarks.map((post) => (
      <Post
        post={post}
        key={post.id}
        triggerRerender={triggerRerender}
      />
    ))
  }
  return <h1 className='mt-20 text-center'>لم يتم العثور على اي منشورات</h1>
}

export const RenderComments = ({ comments }: { comments: comment[] }) => {
  if (comments.length > 0) {
    return comments.map((comment) => (
      <CustomProfileComment
        comment={comment}
        key={comment.id}
      />
    ))
  }
  return <h1 className='mt-20 text-center'>لم يتم العثور على اي تعليقات</h1>
}

export const RenderUsers = ({
  users,
}: {
  users: userProfile<student | staff>[]
}) => {
  if (users.length > 0) {
    return users.map((user) => (
      <UserListUserItem
        userData={user}
        key={user.id}
      />
    ))
  }
  return <h1 className='mt-20 text-center'>لم يتم العثور على اي مستخدمين</h1>
}

export const RenderContent = ({
  view,
  posts,
  comments,
  users,
  bookmarks,
  triggerRerender,
}: RenderContentPopsType) => {
  return view === 'posts' ? (
    <RenderPosts
      posts={posts}
      triggerRerender={triggerRerender}
    />
  ) : view === 'comments' && comments ? (
    <RenderComments comments={comments} />
  ) : view === 'users' && users ? (
    <RenderUsers users={users} />
  ) : view === 'bookmarks' && bookmarks ? (
    <RenderBookmarks
      triggerRerender={triggerRerender}
      bookmarks={bookmarks} />
  ) : (
    ''
  )
}
