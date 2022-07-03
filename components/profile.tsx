import { RiDownloadLine, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'
import data from '../data'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div className='profile__container grid'>
      <div className='profile__data'>
        {/* Profile Data */}
        <motion.div
          className='profile__data__container'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <h2 className='profile__name'>{t('common:my_name')}</h2>
          <h3 className='profile__profession'>{t('home:job_title')}</h3>
        </motion.div>

        {/* Social Links */}
        <motion.ul
          className='profile__social'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {data.header.socialLinks.map((socialLink, i) => {
            return (
              <a
                href={socialLink.url}
                title={socialLink.title}
                target='_blank'
                rel='noreferrer'
                className='profile__social-link'
                key={i}
              >
                <socialLink.icon />
              </a>
            )
          })}
        </motion.ul>
      </div>

      {/* Experience (Info) */}
      <motion.div
        style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='profile__info grid'
      >
        <div className='profile__info-group'>
          <h3 className='profile__info-number'>
            {router.locale === 'ar' ? '+١' : '+1'}
          </h3>
          <p className='profile__info-description'>
            {t('home:work_experience1')} <br /> {t('home:work_experience2')}
          </p>
        </div>
        <div className='profile__info-group'>
          <h3 className='profile__info-number'>
            {router.locale === 'ar' ? '+٢٠' : '+20'}
          </h3>
          <p className='profile__info-description'>
            {t('home:completed_projects2')}
            <br />
            {t('home:completed_projects1')}
          </p>
        </div>
        <div className='profile__info-group'>
          <h3 className='profile__info-number'>
            {router.locale === 'ar' ? '٢' : '2'}
          </h3>
          <p className='profile__info-description'>
            {t('home:num_of_customers2')}
            <br />
            {t('home:num_of_customers1')}
          </p>
        </div>
      </motion.div>

      {/* Contact Btns */}
      <div className='profile__buttons'>
        <motion.a
          download='Yousef Omar'
          href='/YousefOmar.pdf'
          style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
          className='button'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t('home:download_cv')} <RiDownloadLine />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='profile__buttons-small'
        >
          <a
            href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello, more information!'
            target='_blank'
            rel='noreferrer'
            title={t('home:whatsapp_contact')}
            className='button button__small button__gray'
          >
            <RiWhatsappLine />
          </a>
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
