import { RiArrowRightUpLine } from 'react-icons/ri'
import Link from 'next/link'
import { Post, Project } from '../types'
import styles from '../pages/blog/blog.module.css'
import moment from 'moment'

interface Props {
  data: {
    posts: Post[]
    projects: Project[]
  }
}
const Posts = ({ data }: Props) => {
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
    <div className='posts container'>
      {data.posts.slice(0, 4).map((post) => {
        const { slug, categories, title, createdAt, excerpt, language } = post
        return (
          // {/* Single Post  */}
          <Link href={`/blog/${slug}`} key={slug}>
            <div className={blog__post}>
              <small className={blog__createdAt}>
                {moment(createdAt).format('ddd MMMM DD YYYY')}
              </small>
              <div
                className={blog__post__content}
                style={language === 'arabic' ? { direction: 'rtl' } : {}}
              >
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
      })}
      <Link href='/blog'>
        <a className='button posts__btn'>
          View all <RiArrowRightUpLine />
        </a>
      </Link>
    </div>
  )
}

export default Posts
