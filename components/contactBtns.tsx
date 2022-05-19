import { RiDownloadLine, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'

const ContactBtns = () => {
  return (
    <div className='profile__buttons'>
      <a download='true' href='/YousefOmar.pdf' className='button'>
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
  )
}

export default ContactBtns
