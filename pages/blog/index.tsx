import Projectstyles from '../projects/projects.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getAllPosts, GRAPHCMS_ENDPOINT } from '../../services'
import { DataProps, Post } from '../../types'
import styles from './blog.module.css'
import useSWR from 'swr'
import { useState } from 'react'
import request from 'graphql-request'
import Head from 'next/head'
import TopbarWithNoSSR from '../../components/topbar/topbarWithNoSSR'
import React from 'react'
import Loader from '../../components/loader'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'
import { Footer } from '../../components'

export const getStaticProps = async (context: { locale: string }) => {
  const posts = (await getAllPosts()) || []
  return {
    props: {
      posts,
      ...(await serverSideTranslations(context?.locale!, ['blog', 'common'])),
    },
    revalidate: 1,
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
    backhome__btn,
    loader__container,
  } = styles

  const filteredPosts = data?.postsConnection?.edges?.filter(
    (val: { node: Post }) =>
      val?.node?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <div style={{ width: 'min(100% - 2rem, 600px)', margin: 'auto' }}>
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
              style={{ width: '100%' }}
            />
          </div>
          <div className={Projectstyles.project__cards}>
            {data ? (
              filteredPosts?.length > 0 ? (
                filteredPosts.map((post: { node: Post }) => (
                  // <SingleProject key={post?.node?.slug} data={post?.node!} />
                  <h1>{post.node.title}</h1>
                ))
              ) : (
                <h1>{t('blog:no_results')} :/</h1>
              )
            ) : (
              <div className={loader__container}>
                <Loader />
              </div>
            )}
          </div>
          <div
            className={blog__btns}
            style={{ width: 'min(100% - 2rem, 600px)', margin: 'auto' }}
          >
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
      <Footer />
    </div>
  )
}

export default Blog
