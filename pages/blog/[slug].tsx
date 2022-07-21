import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getPost, getPostsSlugs, getContentFragment } from '../../services'
import { Post } from '../../types'
import styles from './blog.module.css'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import moment from 'moment'
import { ScrollToTop, TopbarWithNoSSR, Footer } from '../../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Context } from 'vm'
import React from 'react'

export const getStaticProps = async (context: Context) => {
  const post = await getPost(context.params.slug)
  return {
    props: {
      post,
      ...(await serverSideTranslations(context.locale!, [
        'common',
        'home',
        'blog',
      ])),
    },
    revalidate: 1,
  }
}
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const postsSlugs = await getPostsSlugs()
  const slugPaths = postsSlugs.map((slug: { slug: string }) => ({
    params: { slug: slug.slug },
  }))

  const paths = slugPaths.flatMap((slugPath: { params: { slug: string } }) => {
    return locales?.map((locale) => {
      return {
        params: {
          slug: slugPath.params.slug,
        },
        locale,
      }
    })
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

const PostDetails = ({ post }: { post: Post }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const {
    container,
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

  const {
    title,
    categories,
    author,
    createdAt,
    featuredImage,
    content,
    language,
  } = post

  if (router.isFallback) return <h1>Loading...</h1>
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={container}>
        <TopbarWithNoSSR />
      </header>
      <div className={blog}>
        <div className={blog__container}>
          <div
            className={blog__btns}
            style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          >
            <Link href='/'>
              <a
                className={`button button__small button__gray ${backhome__btn}`}
              >
                {router.locale === 'ar' ? (
                  <RiArrowRightLine />
                ) : (
                  <RiArrowLeftLine />
                )}
                {t('common:back_home')}
              </a>
            </Link>
            <Link href='/blog'>
              <a
                className={`button button__small button__gray ${backhome__btn}`}
              >
                {t('blog:to_blog')}
                {router.locale === 'ar' ? (
                  <RiArrowLeftLine />
                ) : (
                  <RiArrowRightLine />
                )}
              </a>
            </Link>
          </div>
          <div
            className={blog__heading}
            style={language === 'arabic' ? { direction: 'rtl' } : {}}
          >
            <h1 className={blog__title}>{title}</h1>
            <span className={blog__categories}>
              {categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.slug}>
                  <span className={blog__category}>{category.name}</span>
                </Link>
              ))}
            </span>
          </div>
          <div
            className={blog__metadata}
            style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          >
            <small className={blog__lastupdated}>
              <small>{t('blog:last_updated')}</small>
              {moment(createdAt).format('DD/MM/YYYY')}
            </small>
            <div className={blog__author}>
              <Image
                src={author.photo.url}
                alt={`photo of me`}
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
                <span className={blog__author__name}>
                  {t('common:my_name')}
                </span>
                <small style={{ fontSize: '.7rem' }}>
                  {t('home:job_title')}
                </small>
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
          <div
            className={blog__content}
            style={language === 'arabic' ? { direction: 'rtl' } : {}}
          >
            {content?.raw?.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) => (
                <React.Fragment key={index}>
                  {getContentFragment(itemindex, item.text, item)}
                </React.Fragment>
              ))
              return getContentFragment(index, children, typeObj, typeObj.type)
            })}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default PostDetails
