import moment from 'moment'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { RiArrowLeftLine, RiArrowRightUpFill, RiLink } from 'react-icons/ri'
import { CgDetailsMore } from 'react-icons/cg'
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

export const getStaticProps: GetStaticProps = async () => {
  const projects = (await getAllProjects()) || []
  return {
    props: { projects },
  }
}

const fetchData = (endPoint: string, variables: any) =>
  request(endPoint, variables)

const ProjectsPage: NextPage<{ projects: any }> = ({ projects }) => {
  const [value, setValue] = useState(0)
  const tabs = ['all', 'small', 'medium', 'large']

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

  const {
    projects__page,
    projects__container,
    projects__title,
    project__cards,
    project__card,
    project__updatedAt,
    project__card__content,
    project__card__title,
    project__technologies,
    project__tech,
    project__description,
    backhome__btn,
    project__size,
    project__heading,
    project__url__btns,
    project__btn,
    loader__container,
  } = styles

  let selectedProjects =
    tabs[value] === 'all'
      ? data?.projectsConnection?.edges
      : data?.projectsConnection?.edges?.filter(
          (project: { node: Project }) => project?.node?.size === tabs[value]
        )

  return (
    <div>
      <Head>
        <title>Projects</title>
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
      </header>
      <div className={projects__page}>
        <div className={projects__container}>
          <div style={{ minWidth: '600px', margin: 'auto' }}>
            <Link href='/'>
              <a
                className={`button button__small button__gray ${backhome__btn}`}
              >
                <RiArrowLeftLine />
                Go Back Home
              </a>
            </Link>
            <h1 className={projects__title}>The Projects</h1>
          </div>
          {/* Filter Tabs */}
          <ul className='filters__content'>
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
          </ul>
          <div className={project__cards}>
            {selectedProjects ? (
              selectedProjects.map((project: { node: Project }) => (
                <SingleProject data={project?.node!} />
              ))
            ) : (
              <div className={loader__container}>
                <Loader />
              </div>
            )}
          </div>
        </div>
        {error && <div>Failed to load</div>}
      </div>
      <Footer />
    </div>
  )
}

export default ProjectsPage
