import {
  RiCodepenLine,
  RiDownloadLine,
  RiGithubLine,
  RiLinkedinLine,
  RiMessengerLine,
  RiWhatsappLine,
} from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styles from './profile.module.css'

const Profile = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    profile__container,
    profile__data,
    profile__data__container,
    profile__name,
    profile__profession,
    profile__social,
    profile__social__link,
    profile__info,
    profile__info__group,
    profile__info__number,
    profile__info__description,
    profile__buttons,
    profile__buttons__small,
  } = styles

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
  const experiences = [
    {
      arNum: '+١',
      enNum: '+1',
      text1: t('home:work_experience1'),
      text2: t('home:work_experience2'),
    },
    {
      arNum: '+٢٠',
      enNum: '+20',
      text1: t('home:completed_projects1'),
      text2: t('home:completed_projects2'),
    },
    {
      arNum: '٢',
      enNum: '2',
      text1: t('home:num_of_customers1'),
      text2: t('home:num_of_customers2'),
    },
  ]

  return (
    <div className={profile__container}>
      <div className={profile__data}>
        {/* Profile Data */}
        <motion.div
          className={profile__data__container}
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className={profile__name}>{t('common:my_name')}</h2>
          <h3 className={profile__profession}>{t('home:job_title')}</h3>
        </motion.div>

        {/* Social Links */}
        <motion.ul
          className={profile__social}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {socialLinks.map((socialLink, i) => {
            return (
              <motion.a
                drag
                whileDrag={{ scale: 1.2 }}
                href={socialLink.url}
                title={socialLink.title}
                target='_blank'
                rel='noreferrer'
                className={profile__social__link}
                key={i}
              >
                <socialLink.icon />
              </motion.a>
            )
          })}
        </motion.ul>
      </div>

      {/* Experience (Info) */}
      <motion.div
        style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={profile__info}
      >
        {experiences.map((experience, i) => (
          <div key={i} className={profile__info__group}>
            <h3 className={profile__info__number}>
              {router.locale === 'ar' ? experience.arNum : experience.enNum}
            </h3>
            <p className={profile__info__description}>
              {experience.text1} <br /> {experience.text2}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Contact Btns */}
      <div className={profile__buttons}>
        <motion.a
          download='Yousef Omar'
          href='/YousefOmar.pdf'
          style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          className='button'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          drag
          whileDrag={{ scale: 1.1 }}
        >
          {t('home:download_cv')} <RiDownloadLine />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={profile__buttons__small}
        >
          <motion.a
            href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello, more information!'
            target='_blank'
            rel='noreferrer'
            title={t('home:whatsapp_contact')}
            className='button button__small button__gray'
          >
            <RiWhatsappLine />
          </motion.a>
          <a
            href='https://m.me/yousefomar724'
            target='_blank'
            rel='noreferrer'
            title={t('home:messenger_contact')}
            className='button button__small button__gray'
          >
            <RiMessengerLine />
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
