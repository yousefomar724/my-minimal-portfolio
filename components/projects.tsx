import { RiLink, RiArrowRightUpFill } from 'react-icons/ri'
import data from '../data'

const Projects = () => {
  const { projects } = data
  return (
    <div
      className='projects__content grid filters__active'
      data-content
      id='projects'
    >
      {projects.map((project, i) => {
        const { img, title, url, tags, subtitle } = project
        return (
          <article className='projects__card' key={i}>
            {/* <!-- Image should be in a rectangular format (Ex: 600 x 400, 1000 x 800, 1200 x 1000, etc) --> */}
            <img
              src={img}
              alt={title}
              title={title}
              className='projects__img'
            />

            <div className='projects__modal'>
              <div>
                <span className='projects__subtitle'>{subtitle}</span>
                <h3 className='projects__title'>{title}</h3>
                <div className='projects__content'>
                  <div className='projects__content__links'>
                    <a
                      href={url.github}
                      className='projects__button button button__small'
                      title='github repo'
                    >
                      <RiLink />
                    </a>
                    <a
                      href={url.live}
                      className='projects__button button button__small'
                      title='live preview'
                    >
                      <RiArrowRightUpFill />
                    </a>
                  </div>
                  <div className='projects__tags'>
                    {tags.map((tag, i) => {
                      return (
                        <div
                          key={i}
                          title={tag.title}
                          className='projects__tag'
                          color={tag.color}
                          style={{ color: tag.color }}
                        >
                          <tag.icon />
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
  )
}

export default Projects
