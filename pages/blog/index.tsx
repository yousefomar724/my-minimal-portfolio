import moment from 'moment'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightLine, RiH1 } from 'react-icons/ri'
import { getAllPosts, GRAPHCMS_ENDPOINT } from '../../services'
import { DataProps, Post } from '../../types'
import styles from './blog.module.css'
import useSWR from 'swr'
import { useState } from 'react'
import request from 'graphql-request'
import Head from 'next/head'
import TopbarWithNoSSR from '../../components/topbarWithNoSSR'
import React from 'react'
import Loader from '../../components/loader'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = (await getAllPosts()) || []
  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale!, ['blog', 'common'])),
    },
  }
}

const fetchData = (endPoint: string, query: string, variables: any) =>
  request(endPoint, query, variables)

const Blog: NextPage<{ posts: any }> = ({ posts }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [skip, setSkip] = useState(0)
  const { data, error } = useSWR(
    [
      GRAPHCMS_ENDPOINT,
      `  query allPosts($skip: Int) {
      postsConnection(orderBy: createdAt_DESC, first: 5, skip: $skip) {
        edges {
          node {
            title
            createdAt
            excerpt
            language
            categories {
              name
              slug
            }
            slug
            content {
              markdown
            }
            featuredImage {
              url
              width
              height
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }`,
      skip,
    ],
    (endPoint, query) => fetchData(endPoint, query, { skip }),
    { initialData: posts, revalidateOnFocus: false } as unknown as DataProps
  )

  const [searchTerm, setSearchTerm] = useState('')

  const {
    blog,
    blog__container,
    blog__title,
    blog__btns,
    blog__search,
    blog__content,
    blog__post,
    blog__createdAt,
    blog__post__content,
    blog__post__title,
    blog__categories,
    blog__category,
    blog__excerpt,
    backhome__btn,
    loader__container,
  } = styles

  const filteredPosts = data?.postsConnection?.edges?.filter(
    (val: { node: Post }) =>
      val?.node?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const cardsVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 1 },
    },
  }
  const headVariants = {
    hidden: {
      opacity: 0,
      x: -1000,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.5, duration: 1 },
    },
  }

  return (
    <div>
      <Head>
        <title>{t('blog:the_blog')}</title>
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
      </header>

      <div className={blog}>
        <motion.div
          className={blog__container}
          style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          variants={headVariants}
          initial='hidden'
          animate='visible'
        >
          <Link href='/'>
            <a
              className={`button button__small button__gray ${backhome__btn}`}
              style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
            >
              {router.locale === 'ar' ? (
                <RiArrowRightLine />
              ) : (
                <RiArrowLeftLine />
              )}
              {t('common:back_home')}
            </a>
          </Link>
          <h1 className={blog__title} style={{ margin: '1rem 0 2rem' }}>
            {t('blog:the_blog')}
          </h1>
          <input
            type='text'
            placeholder={t('blog:search_blog')}
            className={blog__search}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className={blog__content}>
            {data ? (
              filteredPosts?.length > 0 ? (
                filteredPosts.map((post: { node: Post }) => {
                  const {
                    slug,
                    title,
                    featuredImage: img,
                    excerpt,
                    categories,
                    createdAt,
                    language,
                  } = post?.node!
                  return (
                    <React.Fragment key={slug}>
                      {
                        <Link href={`/blog/${slug}`}>
                          <div className={blog__post}>
                            <small className={blog__createdAt}>
                              {moment(createdAt).format('ddd MMMM DD YYYY')}
                            </small>
                            <div
                              className={blog__post__content}
                              style={
                                language === 'arabic'
                                  ? { direction: 'rtl' }
                                  : {}
                              }
                            >
                              <h3 className={blog__post__title}>{title}</h3>
                              <span className={blog__categories}>
                                {categories.map((category) => (
                                  <Link
                                    href={`/category/${category.slug}`}
                                    key={category.slug}
                                  >
                                    <span className={blog__category}>
                                      {category.name}
                                    </span>
                                  </Link>
                                ))}
                              </span>
                              <p className={blog__excerpt}>{excerpt}</p>
                            </div>
                          </div>
                        </Link>
                      }
                    </React.Fragment>
                  )
                })
              ) : (
                <h1>{t('blog:no_results')} :/</h1>
              )
            ) : (
              <div className={loader__container}>
                <Loader />
              </div>
            )}
          </div>
          <div className={blog__btns}>
            <button
              disabled={!data?.postsConnection?.pageInfo?.hasPreviousPage}
              onClick={() => setSkip((lastValue) => lastValue - 5)}
              className={`button button__small button__gray ${backhome__btn}`}
            >
              {router.locale === 'ar' ? (
                <RiArrowRightLine />
              ) : (
                <RiArrowLeftLine />
              )}
              {t('blog:prev')}
            </button>
            <button
              disabled={!data?.postsConnection?.pageInfo?.hasNextPage}
              onClick={() => setSkip((lastValue) => lastValue + 5)}
              className={`button button__small button__gray ${backhome__btn}`}
            >
              {t('blog:next')}
              {router.locale === 'ar' ? (
                <RiArrowLeftLine />
              ) : (
                <RiArrowRightLine />
              )}
            </button>
          </div>
        </motion.div>
        {error && <div>Failed to load</div>}
      </div>
      <footer className='footer container'>
        <span className='footer__copy'>
          &#169; {t('common:my_name')}. {t('common:footer')}
        </span>
      </footer>
    </div>
  )
}

export default Blog
