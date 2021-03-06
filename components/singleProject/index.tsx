import { Project } from '../../types'
import styles from './singleProject.module.css'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SingleProject = ({ project }: { project: Project }) => {
  const router = useRouter()
  const {
    project__card,
    project__updatedAt,
    project__card__container,
    project__card__title,
    project__technologies,
    project__tech,
    project__size,
    project__heading,
    project__card__img,
    project__card__content,
  } = styles

  const {
    slug,
    title,
    size,
    type,
    image,
    technologies,
    updatedAt,
    previewUrl,
  } = project
  return (
    <div className={project__card}>
      <div className={project__card__container}>
        <img src={image?.url} alt={title} className={project__card__img} />
        <div
          className={project__card__content}
          style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
        >
          <div>
            <small>{type}</small> |{' '}
            <small className={project__size}>{size}</small>
          </div>
          <div className={project__heading}>
            <a href={previewUrl} target='_blank' rel='noreferrer'>
              <h3 className={project__card__title}>{title}</h3>
            </a>
          </div>
          <small className={project__updatedAt}>
            {moment(updatedAt).format('DD/MM/YYYY')}
          </small>
          <span className={project__technologies}>
            {technologies.map((tech) => (
              <a
                href={tech.url}
                key={tech.url}
                target='_blank'
                rel='noreferrer'
              >
                <span className={project__tech}>{tech.name}</span>
              </a>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SingleProject
