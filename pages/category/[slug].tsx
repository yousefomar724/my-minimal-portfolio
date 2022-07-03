import moment from 'moment'
import { GetStaticPaths, NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getCategoriesSlugs, getPostsByCategory } from '../../services'
import { Post } from '../../types'
import styles from '../blog/blog.module.css'
import Head from 'next/head'
import TopbarWithNoSSR from '../../components/topbarWithNoSSR'
import { useRouter } from 'next/router'
import { Params } from 'next/dist/server/router'
import { Footer } from '../../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const categoriesSlugs = await getCategoriesSlugs()
  const slugPaths = categoriesSlugs.map((slug: { slug: any }) => ({
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
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: Params
  locale: string
}) => {
  const posts = await getPostsByCategory(params.slug)
  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale!, [
        'common',
        'home',
        'category',
      ])),
    },
  }
}
const Category: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const {
    blog,
    blog__container,
    blog__title,
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
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div>
      <Head>
        <title>
          {
            posts[0].categories.find((cat) => cat.slug === router.query.slug)
              ?.name
          }
        </title>
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
      </header>
      <div className={blog}>
        <div
          className={blog__container}
          style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
        >
          <Link href='/'>
            <a className={`button button__small button__gray ${backhome__btn}`}>
              {router.locale === 'ar' ? (
                <RiArrowRightLine />
              ) : (
                <RiArrowLeftLine />
              )}
              {t('common:back_home')}
            </a>
          </Link>
          <div className={blog__heading}>
            <h1 className={blog__title}>
              {
                posts[0].categories.find(
                  (cat) => cat.slug === router.query.slug
                )?.name
              }
            </h1>
            <small>{t('category:category')}</small>
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
