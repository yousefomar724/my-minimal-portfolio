import { Params } from 'next/dist/server/router'
import Link from 'next/link'
import he from 'he'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useRouter } from 'next/router'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { Footer } from '../../components'
import ColorThemesBtn from '../../components/colorThemesBtn'
import LightDarkBtn from '../../components/lightDarkBtn'
import { getPost, getPostsSlugs } from '../../services'
import { Post } from '../../types'
import styles from './blog.module.css'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import PostFooter from '../../components/postFooter'

export const getStaticProps = async ({ params }: { params: Params }) => {
  const post = await getPost(params.slug)
  return {
    props: {
      post,
      content: await serialize(he.decode(post.content.markdown)),
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
  content: any
}

const PostDetails = ({ post, content }: Props) => {
  const router = useRouter()

  const {
    blog,
    blog__container,
    blog__title,
    blog__content,
    blog__btns,
    blog__img,
    blog__post,
    blog__createdAt,
    blog__post__content,
    blog__post__title,
    blog__categories,
    blog__category,
    blog__excerpt,
    backhome__btn,
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
  } = post

  if (router.isFallback) return <h1>Loading...</h1>
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className='profile container'>
        <LightDarkBtn />
        <ColorThemesBtn />
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

          <h1 className={blog__title}>{title}</h1>
          <div className={blog__img}>
            <Image
              width={600}
              height={300}
              layout='responsive'
              objectFit='cover'
              objectPosition='center'
              src={featuredImage.url}
              style={{ borderRadius: '20px' }}
            />
          </div>
          <div className={blog__content}>
            <MDXRemote {...content} />
            {/* {props.posts?.map((post) => {
              const {
                slug,
                title,
                featuredImage: img,
                excerpt,
                categories,
                createdAt,
              } = post.node
              return (
                <div className={blog__post} key={slug}>
                  <small className={blog__createdAt}>
                    {moment(createdAt).format('ddd MMMM DD YYYY')}
                  </small>
                  <div className={blog__post__content}>
                    <h3 className={blog__post__title}>{title}</h3>
                    <span className={blog__categories}>
                      {categories.map((cat, index) => (
                        <span className={blog__category} key={index}>
                          {cat.name}
                        </span>
                      ))}
                    </span>
                    <p className={blog__excerpt}>
                      {excerpt.length > 100
                        ? `${excerpt.slice(0, 100)}...`
                        : excerpt}
                    </p>
                  </div>
                </div>
              )
            })} */}
          </div>
        </div>
      </div>
      <PostFooter />
    </div>
  )
}

export default PostDetails
