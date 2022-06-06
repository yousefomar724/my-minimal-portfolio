import { Params } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getPost, getPostsSlugs } from '../../services'
import { Post } from '../../types'
import styles from './blog.module.css'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import PostFooter from '../../components/postFooter'
import Topbar from '../../components/topbar'
import moment from 'moment'

export const getStaticProps = async ({ params }: { params: Params }) => {
  const post = await getPost(params.slug)
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsSlugs = await getPostsSlugs()
  const slugPaths = postsSlugs.map((slug: { slug: any }) => ({
    params: { slug: slug.slug },
  }))

  return {
    paths: slugPaths,
    fallback: true,
  }
}

interface Props {
  post: Post
}

const PostDetails = ({ post }: Props) => {
  const router = useRouter()

  const {
    blog,
    blog__container,
    blog__title,
    blog__content,
    blog__btns,
    blog__img,
    blog__heading,
    blog__post,
    blog__createdAt,
    blog__post__content,
    blog__post__title,
    blog__categories,
    blog__category,
    blog__excerpt,
    backhome__btn,
    blog__author,
    blog__metadata,
    blog__author__name,
  } = styles

  const {
    title,
    excerpt,
    slug,
    categories,
    author,
    createdAt,
    updatedAt,
    featuredImage,
    content,
  } = post

  if (router.isFallback) return <h1>Loading...</h1>
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className='profile container'>
        <Topbar />
      </header>
      <div className={blog}>
        <div className={blog__container}>
          <div className={blog__btns}>
            <Link href='/'>
              <a
                className={`button button__small button__gray ${backhome__btn}`}
              >
                <RiArrowLeftLine />
                Go Home
              </a>
            </Link>
            <Link href='/blog'>
              <a
                className={`button button__small button__gray ${backhome__btn}`}
              >
                Go to Blog
                <RiArrowRightLine />
              </a>
            </Link>
          </div>
          <div className={blog__heading}>
            <h1 className={blog__title}>{title}</h1>
            <span className={blog__categories}>
              {categories.map((category, index) => (
                <Link href={`/category/${category.slug}`} key={index}>
                  <span className={blog__category}>{category.name}</span>
                </Link>
              ))}
            </span>
          </div>
          <div className={blog__metadata}>
            <small className={blog__createdAt}>
              {moment(createdAt).format('ddd MMMM DD YYYY')}
            </small>
            <div className={blog__author}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span className={blog__author__name}>{author.name}</span>
                <small style={{ fontSize: '.7rem' }}>{author.position}</small>
              </div>
              <Image
                src={author.photo.url}
                width={50}
                height={50}
                objectFit='cover'
                objectPosition='center'
                style={{ borderRadius: '50%' }}
              />
            </div>
          </div>
          <div className={blog__img}>
            <Image
              width={600}
              height={300}
              layout='responsive'
              objectFit='cover'
              objectPosition='center'
              src={featuredImage.url}
              style={{ borderRadius: '.25rem' }}
            />
          </div>
          <div className={blog__content}>
            <div
              dangerouslySetInnerHTML={{
                __html: content?.html,
              }}
            />
          </div>
        </div>
      </div>
      <PostFooter />
    </div>
  )
}

export default PostDetails
