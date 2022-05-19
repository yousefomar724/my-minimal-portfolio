import { Edge } from '../types'
import Post from './post'

const Posts = ({ posts }: { posts: Edge[] }) => {
  return (
    <>
      {posts.map((post, i) => (
        <Post post={post} key={i} />
      ))}
    </>
  )
}

export default Posts
