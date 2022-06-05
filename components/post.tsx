import moment from 'moment'
import Link from 'next/link'
import { Post } from '../types'
import styles from '../pages/blog/blog.module.css'

const Post = ({ post }: { post: Post }) => {
  const { title, slug, createdAt, excerpt, categories } = post

  const {
    blog__post,
    blog__createdAt,
    blog__post__content,
    blog__post__title,
    blog__categories,
    blog__category,
    blog__excerpt,
  } = styles
  return (
    <Link href={`/blog/${slug}`}>
      <div className={blog__post} key={slug}>
        <small className={blog__createdAt}>
          {moment(createdAt).format('ddd MMMM DD YYYY')}
        </small>
        <div className={blog__post__content}>
          <h3 className={blog__post__title}>{title}</h3>
          <span className={blog__categories}>
            {categories.map((category, index) => (
              <Link href={`/category/${category.slug}`} key={index}>
                <span className={blog__category}>{category.name}</span>
              </Link>
            ))}
          </span>
          <p className={blog__excerpt}>{excerpt}</p>
        </div>
      </div>
    </Link>
  )
}

export default Post
