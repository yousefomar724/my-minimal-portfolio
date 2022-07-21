import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  RiArrowRightUpFill,
  RiArrowRightUpLine,
  RiArrowLeftUpLine,
  RiGithubFill,
} from 'react-icons/ri'
import { Post, Project } from '../../types'
import Modal from '../modal'
import styles from './projects.module.css'

interface Props {
  data: { posts: Post[]; projects: Project[] }
}

const Projects = ({ data }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [value, setValue] = useState(0)
  const {
    projects__content,
    projects__container,
    projects__card,
    projects__modal,
    projects__title,
    projects__subtitle,
    project__size,
    project__content,
    projects__links__container,
    projects__content__links,
    projects__button,
    projects__tags,
    projects__tag,
    projects__btn,
  } = styles
  return (
    <div className={projects__content} data-content id='projects'>
      <div className={projects__container}>
        {data.projects.map((project, i: number) => {
          const {
            slug,
            image,
            title,
            githubUrl,
            previewUrl,
            type,
            technologies,
            size,
          } = project
          return (
            <article className={projects__card} key={slug}>
              {/* <!-- Image should be in a rectangular format (Ex: 600 x 400, 1000 x 800, 1200 x 1000, etc) --> */}
              <Image
                src={image.url}
                alt={title}
                title={title}
                priority={true}
                layout='fill'
              />

              <div className={projects__modal}>
                <div>
                  <span className={projects__subtitle}>{type}</span> |{' '}
                  <span className={project__size}>{size}</span>
                  <h3 className={projects__title}>{title}</h3>
                  <div className={project__content}>
                    <div className={projects__links__container}>
                      <div className={projects__content__links}>
                        <a
                          target='_blank'
                          href={githubUrl}
                          rel='noreferrer'
                          className={`${projects__button} button button__small`}
                          title='github repo'
                        >
                          <RiGithubFill />
                        </a>
                        <a
                          href={previewUrl}
                          target='_blank'
                          rel='noreferrer'
                          className={`${projects__button} button button__small`}
                          title='live preview'
                        >
                          <RiArrowRightUpFill />
                        </a>
                      </div>
                      <span
                        className={`${projects__button} ${project__size} button button__small`}
                        onClick={() => {
                          setShowModal(true)
                          setValue(i)
                        }}
                      >
                        Details
                      </span>
                    </div>
                    {value === i && (
                      <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        project={project}
                      />
                    )}
                    <div className={projects__tags}>
                      {technologies.map((tech, i) => {
                        return (
                          <div
                            key={i}
                            title={tech.name}
                            className={projects__tag}
                          >
                            <Image
                              width={30}
                              height={30}
                              objectFit='cover'
                              objectPosition='center'
                              src={tech.image.url}
                              alt={tech.name}
                              style={{ borderRadius: '10px' }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <Link href='/projects'>
        <a
          className={`button ${projects__btn}`}
          style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
        >
          {t('home:view_all')}
          {router.locale === 'ar' ? (
            <RiArrowLeftUpLine />
          ) : (
            <RiArrowRightUpLine />
          )}
        </a>
      </Link>
    </div>
  )
}

export default Projects
