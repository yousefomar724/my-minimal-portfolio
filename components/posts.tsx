import { Edge } from '../types'
import Post from './post'
import { RiArrowRightUpLine } from 'react-icons/ri'
import Link from 'next/link'

const Posts = ({ posts }: { posts: Edge[] }) => {
  return (
    <div className='posts container'>
      {posts.slice(0, 4).map((post, i) => (
        <Post post={post} key={i} />
      ))}
      <Link href={`/posts`}>
        <a className='button posts__btn'>
          View all <RiArrowRightUpLine />
        </a>
      </Link>
    </div>
  )
}

export default Posts
