import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styles from './skills.module.css'

const Skills = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const skillsData = {
    frontend: {
      title: t('home:frontend'),
      frontendSkills: [
        {
          tech: 'HTML',
          level: t('home:basic'),
        },
        {
          tech: 'React',
          level: t('home:intermediate'),
        },
        {
          tech: 'CSS',
          level: t('home:advanced'),
        },
        {
          tech: 'Bootstrap',
          level: t('home:intermediate'),
        },
        {
          tech: 'JavaScript',
          level: t('home:intermediate'),
        },
        {
          tech: 'Git',
          level: t('home:intermediate'),
        },
      ],
    },
    backend: {
      title: t('home:backend'),
      backendSkills: [
        {
          tech: 'Node Js',
          level: t('home:intermediate'),
        },
        {
          tech: 'Python',
          level: t('home:basic'),
        },
        {
          tech: 'Mongo DB',
          level: t('home:basic'),
        },
        {
          tech: 'Firebase',
          level: t('home:intermediate'),
        },
        {
          tech: 'Ruby & Rails',
          level: t('home:basic'),
        },
      ],
    },
  }
  const {
    skills__content,
    skills__title,
    skills__box,
    skills__group,
    skills__data,
    skills__name,
    skills__level,
  } = styles
  return (
    <div
      className={skills__content}
      style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
    >
      <div>
        <h3 className={skills__title}>{skillsData.frontend.title}</h3>

        <div className={skills__box}>
          <div className={skills__group}>
            {skillsData.frontend.frontendSkills.slice(0, 3).map((skill, i) => {
              return (
                <div className={skills__data} key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className={skills__name}>{skill.tech}</h3>
                    <span className={skills__level}>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={skills__group}>
            {skillsData.frontend.frontendSkills.slice(3, 6).map((skill, i) => {
              return (
                <div className={skills__data} key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className={skills__name}>{skill.tech}</h3>
                    <span className={skills__level}>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <h3 className={skills__title}>{skillsData.backend.title}</h3>

        <div className={skills__box}>
          <div className={skills__group}>
            {skillsData.backend.backendSkills.slice(0, 3).map((skill, i) => {
              return (
                <div className={skills__data} key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className={skills__name}>{skill.tech}</h3>
                    <span className={skills__level}>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={skills__group}>
            {skillsData.backend.backendSkills.slice(3, 5).map((skill, i) => {
              return (
                <div className={skills__data} key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className={skills__name}>{skill.tech}</h3>
                    <span className={skills__level}>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
