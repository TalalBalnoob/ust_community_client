import { comment, post } from '../../types/posts.type'
import Comment from '../Comment'
import Post from '../posts/Post'

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
      // TODO: replace this component with custom new one
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
      // TODO: replace this component with custom new one
      <Comment
        comment={comment}
        key={comment.id}
        handleDeleteComment={() => {}}
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
