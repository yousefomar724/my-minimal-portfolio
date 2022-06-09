import moment from 'moment'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import {
  getAllPosts,
  getCategoriesSlugs,
  getPostsByCategory,
  GRAPHCMS_ENDPOINT,
} from '../../services'
import { DataProps, Post } from '../../types'
import styles from '../blog/blog.module.css'
import useSWR from 'swr'
import { useState } from 'react'
import request from 'graphql-request'
import Head from 'next/head'
import TopbarWithNoSSR from '../../components/topbarWithNoSSR'
import { useRouter } from 'next/router'
import { Params } from 'next/dist/server/router'
import { Footer } from '../../components'

export const getStaticProps = async ({ params }: { params: Params }) => {
  const posts = await getPostsByCategory(params.slug)
  return {
    props: {
      posts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoriesSlugs = await getCategoriesSlugs()
  const slugPaths = categoriesSlugs.map((slug: { slug: string }) => ({
    params: { slug: slug.slug },
  }))

  return {
    paths: slugPaths,
    fallback: true,
  }
}

const Category: NextPage<{ posts: Post[] }> = ({ posts }) => {
  console.log(posts)
  const {
    blog,
    blog__container,
    blog__title,
    blog__btns,
    blog__content,
    blog__post,
    blog__createdAt,
    blog__post__content,
    blog__post__title,
    blog__categories,
    blog__category,
    blog__excerpt,
    backhome__btn,
    blog__heading,
  } = styles
  const { query } = useRouter()

  return (
    <div>
      <Head>
        <title>
          {posts[0].categories.find((cat) => cat.slug === query.slug)?.name}
        </title>
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
      </header>
      <div className={blog}>
        <div className={blog__container}>
          <Link href='/'>
            <a className={`button button__small button__gray ${backhome__btn}`}>
              <RiArrowLeftLine />
              Go Back Home
            </a>
          </Link>
          <div className={blog__heading}>
            <h1 className={blog__title}>
              {posts[0].categories.find((cat) => cat.slug === query.slug)?.name}
            </h1>
            <small>Category</small>
          </div>
          <div className={blog__content}>
            {posts.map((post: Post) => {
              const {
                slug,
                title,
                featuredImage: img,
                excerpt,
                categories,
                createdAt,
              } = post
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
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Category
