import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  RiLink,
  RiArrowRightUpFill,
  RiArrowRightUpLine,
  RiArrowLeftUpLine,
} from 'react-icons/ri'
import { Post, Project } from '../types'

interface Props {
  data: { posts: Post[]; projects: Project[] }
}

const Projects = ({ data }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <div className='projects__content' data-content id='projects'>
      <div className='projects__container'>
        {data.projects.map((project) => {
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
            <article className='projects__card' key={slug}>
              {/* <!-- Image should be in a rectangular format (Ex: 600 x 400, 1000 x 800, 1200 x 1000, etc) --> */}
              <Image src={image.url} alt={title} title={title} layout='fill' />

              <div className='projects__modal'>
                <div>
                  <span className='projects__subtitle'>{type}</span> |{' '}
                  <span className='project__size'>{size}</span>
                  <h3 className='projects__title'>{title}</h3>
                  <div className='project__content'>
                    <div className='projects__content__links'>
                      <a
                        target='_blank'
                        href={githubUrl}
                        rel='noreferrer'
                        className='projects__button button button__small'
                        title='github repo'
                      >
                        <RiLink />
                      </a>
                      <a
                        href={previewUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='projects__button button button__small'
                        title='live preview'
                      >
                        <RiArrowRightUpFill />
                      </a>
                    </div>
                    <div className='projects__tags'>
                      {technologies.map((tech, i) => {
                        return (
                          <div
                            key={i}
                            title={tech.name}
                            className='projects__tag'
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
          className='button projects__btn'
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
