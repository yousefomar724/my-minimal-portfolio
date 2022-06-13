import { useEffect, useState } from 'react'
import { RiArrowUpFill, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisiblity = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisiblity)
    return () => window.removeEventListener('scroll', toggleVisiblity)
  }, [])

  return (
    <div className='fixed__btns'>
      <a
        href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello, more information!'
        target='_blank'
        title='Contact me on WhatsApp'
        rel='noreferrer'
        className='button button__small button__gray scrollToTop__button'
      >
        <RiWhatsappLine />
      </a>
      <a
        href='https://m.me/yousefomar724'
        title='Contact me on Messenger'
        target='_blank'
        rel='noreferrer'
        className='button button__small button__gray scrollToTop__button'
      >
        <RiMessengerLine />
      </a>
      <button
        onClick={scrollToTop}
        className={`${
          isVisible
            ? 'button button__small button__gray scrollToTop__button'
            : 'hide'
        }`}
      >
        <RiArrowUpFill />
      </button>
    </div>
  )
}

export default ScrollToTop
