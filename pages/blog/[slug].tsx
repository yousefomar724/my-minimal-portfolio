import { Params } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getPost, getPostsSlugs } from '../../services'
import { Post, Type } from '../../types'
import styles from './blog.module.css'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '../../components/footer'
import moment from 'moment'
import TopbarWithNoSSR from '../../components/topbarWithNoSSR'
import React, { ReactNode } from 'react'
import Highlight from 'react-highlight'
import ScrollToTop from '../../components/scrollToTop'

const getContentFragment = (
  index: number,
  text: string | ReactNode,
  obj?: any,
  type?: Type
) => {
  let modifiedText: any = text

  if (obj) {
    if (obj.bold) {
      modifiedText = <b key={index}>{text}</b>
    }

    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>
    }

    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>
    }
    if (obj.code) {
      modifiedText = <code key={index}>{text}</code>
    }
    if (obj.type === 'link') {
      modifiedText = (
        <a key={index} href={obj?.href} target='_blank' rel={obj?.rel}>
          {obj?.children?.map((item: any, i: number) => {
            if (item?.code) {
              return <code key={index}>{item.text}</code>
            }
            if (item.type === 'link') {
              return (
                <React.Fragment key={i}>{item.children[0].text}</React.Fragment>
              )
            }
            return <React.Fragment key={i}>{item.text}</React.Fragment>
          })}
        </a>
      )
    }
  }

  switch (type) {
    case 'heading-one':
      return (
        <h1 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      )
    case 'paragraph':
      return (
        <p key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      )
    case 'heading-four':
      return (
        <h4 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      )
    case 'code-block':
      return <Highlight key={index}>{modifiedText}</Highlight>
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      )
    default:
      return modifiedText
  }
}

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
    fallback: false,
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
    blog__categories,
    blog__category,
    backhome__btn,
    blog__author,
    blog__metadata,
    blog__author__name,
    blog__lastupdated,
  } = styles

  const { title, categories, author, createdAt, featuredImage, content } = post

  if (router.isFallback) return <h1>Loading...</h1>
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
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
            <small className={blog__lastupdated}>
              <small> last updated</small>
              {moment(createdAt).format('ddd MMMM DD YYYY')}
            </small>
            <div className={blog__author}>
              <Image
                src={author.photo.url}
                alt={`photo of ${author.name}`}
                width={50}
                height={50}
                objectFit='cover'
                objectPosition='center'
                style={{ borderRadius: '50%' }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span className={blog__author__name}>{author.name}</span>
                <small style={{ fontSize: '.7rem' }}>{author.position}</small>
              </div>
            </div>
          </div>
          <div className={blog__img}>
            <Image
              width={600}
              height={300}
              alt={`project : ${title}`}
              layout='responsive'
              objectFit='cover'
              objectPosition='center'
              src={featuredImage.url}
              style={{ borderRadius: '.25rem' }}
            />
          </div>
          <div className={blog__content}>
            {/* {JSON.stringify(content.raw, null, 2)} */}
            {content?.raw?.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) =>
                getContentFragment(itemindex, item.text, item)
              )

              return getContentFragment(index, children, typeObj, typeObj.type)
            })}
            {/* <div
              dangerouslySetInnerHTML={{
                __html: content?.html,
              }}
            /> */}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default PostDetails
