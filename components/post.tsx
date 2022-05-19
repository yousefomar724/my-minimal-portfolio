import { Edge } from '../types'

const Post = ({ post }: { post: Edge }) => {
  return <div>{post.node.title}</div>
}

export default Post
