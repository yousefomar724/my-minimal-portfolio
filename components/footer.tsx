import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import data from '../data'

const Footer = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <footer className='footer container'>
      <ul className='profile__social'>
        {data.header.socialLinks.map((socialLink, i) => {
          return (
            <a
              href={socialLink.url}
              target='_blank'
              rel='noreferrer'
              className='profile__social-link post__social-link'
              key={i}
            >
              <socialLink.icon />
            </a>
          )
        })}
      </ul>
      <span className='post__footer'>
        &#169; {t('common:my_name')}. {t('common:footer')}
      </span>
    </footer>
  )
}

export default Footer
