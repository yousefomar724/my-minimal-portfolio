import Image from 'next/image'
import { RiDownloadLine, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'
import data from '../data'

const Profile = () => {
  return (
    <div className='profile__container grid'>
      <div className='profile__data'>
        {/* Profile Data */}
        <>
          <div className='profile__border'>
            <div className='profile__img'>
              <Image
                width='120px'
                height='120px'
                src='/me.png'
                alt='picture of me'
              />
            </div>
          </div>
          <h2 className='profile__name'>Yousef Omar</h2>
          <h3 className='profile__profession'>Web developer</h3>
        </>

        {/* Social Links */}
        <ul className='profile__social'>
          {data.header.socialLinks.map((socialLink, i) => {
            return (
              <a
                href={socialLink.url}
                target='_blank'
                rel='noreferrer'
                className='profile__social-link'
                key={i}
              >
                <socialLink.icon />
              </a>
            )
          })}
        </ul>
      </div>

      {/* Experience (Info) */}
      <div className='profile__info grid'>
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
      </div>

      {/* Contact Btns */}
      <div className='profile__buttons'>
        <a download='Yousef Omar' href='/YousefOmar.pdf' className='button'>
          Download CV <RiDownloadLine />
        </a>

        <div className='profile__buttons-small'>
          <a
            href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello, more information!'
            target='_blank'
            rel='noreferrer'
            className='button button__small button__gray'
          >
            <RiWhatsappLine />
          </a>
          <a
            href='https://m.me/yousefomar724'
            target='_blank'
            rel='noreferrer'
            className='button button__small button__gray'
          >
            <RiMessengerLine />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Profile
