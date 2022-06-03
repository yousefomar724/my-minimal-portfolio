import { Edge } from '../types'
import moment from 'moment'
import Link from 'next/link'

const Post = ({ post }: { post: Edge }) => {
  const { title, slug, categories, createdAt } = post.node
  return (
    <div className='posts__content'>
      <Link href={`/posts/${slug}`}>
        <h3 className='posts__title'>{title}</h3>
      </Link>
      <small className='posts__createdAt'>
        {moment(createdAt).format('ddd, MMMM Do, YYYY, h:mm:ss A')}
      </small>
    </div>
  )
}

export default Post
