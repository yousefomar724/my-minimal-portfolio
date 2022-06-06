import moment from 'moment'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getAllPosts, GRAPHCMS_ENDPOINT } from '../../services'
import { DataProps, Post } from '../../types'
import styles from './blog.module.css'
import useSWR from 'swr'
import { useState } from 'react'
import request from 'graphql-request'
import Head from 'next/head'
import { Topbar } from '../../components'

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getAllPosts()) || []
  return {
    props: { posts },
  }
}

const fetchData = (endPoint: string, query: string, variables: any) =>
  request(endPoint, query, variables)

const Blog: NextPage<{ posts: any }> = ({ posts }) => {
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
  } = styles

  return (
    <div>
      <Head>
        <title>The Blog</title>
      </Head>
      <header className='profile container'>
        <Topbar />
      </header>
      <div className={blog}>
        <div className={blog__container}>
          <Link href='/'>
            <a className={`button button__small button__gray ${backhome__btn}`}>
              <RiArrowLeftLine />
              Go Back Home
            </a>
          </Link>
          <h1 className={blog__title}>The Blog</h1>
          <input
            type='text'
            placeholder='Search blog posts'
            className={blog__search}
          />
          <div className={blog__content}>
            {data?.postsConnection?.edges?.map((post: { node: Post }) => {
              const {
                slug,
                title,
                featuredImage: img,
                excerpt,
                categories,
                createdAt,
              } = post?.node!
              return (
                <Link href={`/blog/${slug}`} key={slug}>
                  <div className={blog__post}>
                    <small className={blog__createdAt}>
                      {moment(createdAt).format('ddd MMMM DD YYYY')}
                    </small>
                    <div className={blog__post__content}>
                      <h3 className={blog__post__title}>{title}</h3>
                      <span className={blog__categories}>
                        {categories.map((category, index) => (
                          <Link href={`/category/${category.slug}`} key={index}>
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
              )
            })}
          </div>
          <div className={blog__btns}>
            <button
              disabled={!data?.postsConnection?.pageInfo?.hasPreviousPage}
              onClick={() => setSkip((lastValue) => lastValue - 5)}
              className={`button button__small button__gray ${backhome__btn}`}
            >
              <RiArrowLeftLine />
              Prev
            </button>
            <button
              disabled={!data?.postsConnection?.pageInfo?.hasNextPage}
              onClick={() => setSkip((lastValue) => lastValue + 5)}
              className={`button button__small button__gray ${backhome__btn}`}
            >
              Next
              <RiArrowRightLine />
            </button>
          </div>
          {/* <p>Total Pages: {pageInfo?.pageSize}</p> */}
        </div>
        {error && <div>Failed to load</div>}
      </div>
      <footer className='footer container'>
        <span className='footer__copy'>
          &#169; Yousef Omar. All rigths reserved
        </span>
      </footer>
    </div>
  )
}

export default Blog
