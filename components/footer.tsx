import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import data from '../data'

const Footer = () => {
  const { t } = useTranslation()
  const footerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 40 },
  }

  return (
    <motion.footer
      className='footer container'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 1 }}
      variants={footerVariants}
    >
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
    </motion.footer>
  )
}

export default Footer
