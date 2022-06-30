import { RiDownloadLine, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'
import data from '../data'
import { motion } from 'framer-motion'

const Profile = () => {
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
          <h2 className='profile__name'>Yousef Omar</h2>
          <h3 className='profile__profession'>Web developer</h3>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='profile__info grid'
      >
        {data.header.experience.map((item, i) => {
          return (
            <div className='profile__info-group' key={i}>
              <h3 className='profile__info-number'>{item.num}</h3>
              <p className='profile__info-description'>
                {item.text1} <br /> {item.text2}
              </p>
            </div>
          )
        })}
      </motion.div>

      {/* Contact Btns */}
      <div className='profile__buttons'>
        <motion.a
          download='Yousef Omar'
          href='/YousefOmar.pdf'
          className='button'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Download CV <RiDownloadLine />
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
            title='Contact me on WhatsApp'
            className='button button__small button__gray'
          >
            <RiWhatsappLine />
          </a>
          <a
            href='https://m.me/yousefomar724'
            target='_blank'
            rel='noreferrer'
            title='Contact me on Messenger'
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
