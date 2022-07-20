import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { RiCodepenLine, RiGithubLine, RiLinkedinLine } from 'react-icons/ri'
import styles from './footer.module.css'

const Footer = () => {
  const { t } = useTranslation()

  const socialLinks = [
    {
      title: 'Codepen',
      icon: RiCodepenLine,
      url: 'https://codepen.io/yousefomar724',
    },
    {
      title: 'Linkedin',
      icon: RiLinkedinLine,
      url: 'https://www.linkedin.com/in/yousefomar724/',
    },
    {
      title: 'GitHub',
      icon: RiGithubLine,
      url: 'https://github.com/yousefomar724',
    },
  ]

  const footerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 40 },
  }

  return (
    <motion.footer
      className='container'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.5 }}
      variants={footerVariants}
    >
      <ul className={styles.footer__social}>
        {socialLinks.map((socialLink, i) => {
          return (
            <a
              href={socialLink.url}
              target='_blank'
              rel='noreferrer'
              className={styles.footer__social__link}
              key={i}
            >
              <socialLink.icon />
            </a>
          )
        })}
      </ul>
      <span className={styles.footer__text}>
        &#169; {t('common:my_name')}. {t('common:footer')}
      </span>
    </motion.footer>
  )
}

export default Footer
