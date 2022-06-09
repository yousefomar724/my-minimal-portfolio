import Image from 'next/image'
import Link from 'next/link'
import { RiLink, RiArrowRightUpFill, RiArrowRightUpLine } from 'react-icons/ri'
import { Post, Project } from '../types'

interface Props {
  data: { posts: Post[]; projects: Project[] }
}

const Projects = ({ data }: Props) => {
  return (
    <div
      className='projects__content grid filters__active'
      data-content
      id='projects'
    >
      {data.projects.map((project, i) => {
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
          <Link href={`/projects/${slug}`} key={i}>
            <article className='projects__card'>
              {/* <!-- Image should be in a rectangular format (Ex: 600 x 400, 1000 x 800, 1200 x 1000, etc) --> */}
              <Image src={image.url} alt={title} title={title} layout='fill' />

              <div className='projects__modal'>
                <div>
                  <span className='projects__subtitle'>{type}</span>
                  <h3 className='projects__title'>{title}</h3>
                  <div className='projects__content'>
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
          </Link>
        )
      })}
      <Link href='/projects'>
        <a className='button projects__btn'>
          View all <RiArrowRightUpLine />
        </a>
      </Link>
    </div>
  )
}

export default Projects
