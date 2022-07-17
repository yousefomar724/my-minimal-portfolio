import { Item } from '../types'
import styles from '../pages/projects/projects.module.css'
import moment from 'moment'
import Link from 'next/link'

const SingleProject = ({ data }: { data: Item }) => {
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
    featuredImage,
    categories,
    excerpt,
  } = data
  return (
    <div className={project__card} key={slug}>
      <div className={project__card__container}>
        <img
          src={image?.url || featuredImage?.url}
          alt={title}
          className={project__card__img}
          style={featuredImage ? { height: 'auto' } : { height: '250px' }}
        />
        <div className={project__card__content}>
          <div>
            {size && type && (
              <>
                <small>{type}</small> |{' '}
                <small className={project__size}>{size}</small>
              </>
            )}
          </div>
          <div className={project__heading}>
            <Link href={previewUrl ? previewUrl : `/blog/${slug}`}>
              <a
                target={previewUrl ? '_blank' : ''}
                rel={previewUrl ? 'noreferrer' : ''}
              >
                <h3 className={project__card__title}>{title}</h3>
              </a>
            </Link>
          </div>
          <small className={project__updatedAt}>
            {moment(updatedAt).format('DD/MM/YYYY')}
          </small>
          <span className={project__technologies}>
            {technologies
              ? technologies.map((tech) => (
                  <a
                    href={tech.url}
                    key={tech.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span className={project__tech}>{tech.name}</span>
                  </a>
                ))
              : categories?.map((category) => (
                  <Link
                    href={`/category/${category?.slug}`}
                    key={category?.slug}
                  >
                    <a>
                      <span className={project__tech}>{category?.name}</span>
                    </a>
                  </Link>
                ))}
          </span>
          {excerpt && <p>{excerpt}</p>}
        </div>
      </div>
    </div>
  )
}

export default SingleProject
