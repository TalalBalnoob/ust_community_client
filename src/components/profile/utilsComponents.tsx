import { comment, post } from '../../types/posts.type'
import Post from '../posts/Post'
import CustomProfileComment from './CustomProfileComment'

type RenderContentPopsType = {
  posts: post[]
  triggerRerender: () => void
  comments: comment[]
  view: 'posts' | 'comments'
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
  return <h1>لا يوجد منشورات</h1>
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
  return <h1>لا يوجد تعليقات</h1>
}

export const RenderContent = ({
  view,
  posts,
  comments,
  triggerRerender,
}: RenderContentPopsType) => {
  return view === 'posts' ? (
    <RenderPosts
      posts={posts}
      triggerRerender={triggerRerender}
    />
  ) : (
    <RenderComments comments={comments} />
  )
}
