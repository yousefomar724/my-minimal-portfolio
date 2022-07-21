import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { RiArrowUpFill, RiMessengerLine, RiWhatsappLine } from 'react-icons/ri'
import styles from './scrollToTop.module.css'

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

  const { t } = useTranslation()

  return (
    <div className={styles.fixed__btns}>
      <a
        href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello, more information!'
        target='_blank'
        title={t('home:whatsapp_contact')}
        rel='noreferrer'
        className={`button button__small button__gray ${styles.scrollToTop__button}`}
      >
        <RiWhatsappLine />
      </a>
      <a
        href='https://m.me/yousefomar724'
        title={t('home:messenger_contact')}
        target='_blank'
        rel='noreferrer'
        className={`button button__small button__gray ${styles.scrollToTop__button}`}
      >
        <RiMessengerLine />
      </a>
      <button
        onClick={scrollToTop}
        className={`${
          isVisible
            ? `button button__small button__gray ${styles.scrollToTop__button}`
            : `${styles.hide}`
        }`}
      >
        <RiArrowUpFill />
      </button>
    </div>
  )
}

export default ScrollToTop
