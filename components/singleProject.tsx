import { Project } from '../types'
import styles from '../pages/projects/projects.module.css'
import moment from 'moment'

const SingleProject = ({ data }: { data: Project }) => {
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
    project__card__img,
  } = styles

  const {
    slug,
    title,
    size,
    type,
    image,
    description,
    technologies,
    updatedAt,
    githubUrl,
    previewUrl,
  } = data
  return (
    <div className={project__card} key={slug}>
      <div className={project__card__content}>
        <img src={image.url} alt={title} className={project__card__img} />
        <div style={{ padding: '0 1rem 1rem' }}>
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
