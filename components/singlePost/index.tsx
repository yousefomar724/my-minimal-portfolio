import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Post } from '../../types'
import styles from './singlePost.module.css'

const SinglePost = ({ post }: { post: Post }) => {
  console.log(post)
  const router = useRouter()
  const {
    post__card,
    post__updatedAt,
    post__card__container,
    post__card__title,
    post__technologies,
    post__tech,
    post__size,
    post__heading,
    post__card__img,
    post__card__content,
  } = styles

  const {
    slug,
    title,
    excerpt,
    language,
    featuredImage,
    categories,
    updatedAt,
  } = post
  return (
    <Link href={`/blog/${slug}`}>
      <div
        className={post__card}
        style={language === 'arabic' ? { direction: 'rtl' } : {}}
      >
        <div className={post__card__container}>
          <img
            src={featuredImage?.url}
            alt={title}
            className={post__card__img}
          />
          <div
            className={post__card__content}
            style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          >
            <h3
              className={post__card__title}
              style={language === 'english' ? { fontSize: '1.1rem' } : {}}
            >
              {title}
            </h3>
            <small className={post__updatedAt}>
              {moment(updatedAt).format('DD/MM/YYYY')}
            </small>
            <span className={post__technologies}>
              {categories.map((tech) => (
                <Link href={`/category/${tech.slug}`} key={tech.slug}>
                  <a>
                    <span className={post__tech}>{tech.name}</span>
                  </a>
                </Link>
              ))}
            </span>
            <p style={language === 'english' ? { fontSize: '.9rem' } : {}}>
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SinglePost
