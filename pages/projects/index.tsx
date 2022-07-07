import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { getAllProjects, GRAPHCMS_ENDPOINT } from '../../services'
import { DataProps, Project } from '../../types'
import styles from '../projects/projects.module.css'
import useSWR from 'swr'
import { useState } from 'react'
import request from 'graphql-request'
import Head from 'next/head'
import TopbarWithNoSSR from '../../components/topbarWithNoSSR'
import { Footer } from '../../components'
import Loader from '../../components/loader'
import SingleProject from '../../components/singleProject'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const projects = (await getAllProjects()) || []
  return {
    props: {
      projects,
      ...(await serverSideTranslations(locale!, [
        'projects',
        'home',
        'common',
      ])),
      locale,
    },
  }
}

const fetchData = (endPoint: string, variables: any) =>
  request(endPoint, variables)

const ProjectsPage: NextPage<{ projects: any }> = ({ projects }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const tabs = [
    t('projects:all'),
    t('projects:small'),
    t('projects:medium'),
    t('projects:large'),
  ]

  const { data, error } = useSWR(
    [
      GRAPHCMS_ENDPOINT,
      `
    query allprojects() {
      projectsConnection(orderBy: updatedAt_DESC) {
        edges {
          node {
            description
            id
            image {
              height
              url
            }
            previewUrl
            githubUrl
            slug
            size
            technologies {
              image {
                height
                url
                width
              }
              url
              name
            }
            title
            type
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          pageSize
        }
      }
    }
  `,
    ],
    (endPoint, query) => fetchData(endPoint, query),
    { initialData: projects, revalidateOnFocus: false } as unknown as DataProps
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

  const {
    projects__page,
    projects__container,
    projects__title,
    project__cards,
    backhome__btn,
    loader__container,
  } = styles

  const enTabs = ['all', 'small', 'medium', 'large']
  let selectedProjects =
    enTabs[value] === 'all'
      ? data?.projectsConnection?.edges
      : data?.projectsConnection?.edges?.filter(
          (project: { node: Project }) => project?.node?.size === enTabs[value]
        )

  return (
    <div>
      <Head>
        <title>{t('projects:the_projects')}</title>
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
      </header>
      <div className={projects__page}>
        <div className={projects__container}>
          <motion.div
            style={
              router.locale === 'ar'
                ? {
                    direction: 'rtl',
                    width: 'min(100% - 2rem, 600px)',
                    margin: 'auto',
                  }
                : { width: 'min(100% - 2rem, 600px)', margin: 'auto' }
            }
            variants={headVariants}
            initial='hidden'
            animate='visible'
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
            <h1 className={projects__title}>{t('projects:the_projects')}</h1>
          </motion.div>
          {/* Filter Tabs */}
          <motion.ul
            variants={cardsVariants}
            initial='hidden'
            animate='visible'
            className='filters__content'
            style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          >
            {tabs.map((tab, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setValue(index)}
                  className={`filters__button ${
                    value === index && 'filter-tab-active'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </motion.ul>
          <motion.div
            className={project__cards}
            variants={cardsVariants}
            initial='hidden'
            animate='visible'
          >
            {selectedProjects ? (
              selectedProjects.map((project: { node: Project }) => (
                <SingleProject
                  key={project?.node?.slug}
                  data={project?.node!}
                />
              ))
            ) : (
              <div className={loader__container}>
                <Loader />
              </div>
            )}
          </motion.div>
        </div>
        {error && <div>Failed to load</div>}
      </div>
      <Footer />
    </div>
  )
}

export default ProjectsPage
