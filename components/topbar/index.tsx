import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import styles from './topbar.module.css'

const Topbar = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('portfolio-dark-theme')!) || false
  )

  const router = useRouter()

  useEffect(() => {
    const darkTheme = window.localStorage.getItem('portfolio-dark-theme')
    if (darkTheme !== null) setIsDark(JSON.parse(darkTheme))
  }, [])

  useEffect(() => {
    isDark
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme')
    window.localStorage.setItem('portfolio-dark-theme', JSON.stringify(isDark))
  }, [isDark])

  useEffect(() => {
    colors.map((color, index) => {
      setValue((prevValue) => {
        if (
          document.documentElement.style.getPropertyValue('--hue') === color.hue
        ) {
          return index
        }
        return prevValue
      })
    })
  }, [])

  const handleColors = (
    hue: string,
    sat: string,
    lig: string,
    index: number
  ) => {
    document.documentElement.style.setProperty('--hue', hue)
    document.documentElement.style.setProperty('--sat', sat)
    document.documentElement.style.setProperty('--lig', lig)
    setValue(index)
  }

  const colors = [
    {
      color: t('home:blue'),
      hue: '207',
      sat: '90%',
      lig: '61%',
    },
    {
      color: t('home:purple'),
      hue: '250',
      sat: '66%',
      lig: '75%',
    },
    {
      color: t('home:pink'),
      hue: '356',
      sat: '90%',
      lig: '61%',
    },
    {
      color: t('home:teal'),
      hue: '174',
      sat: '63%',
      lig: '62%',
    },
  ]

  return (
    <>
      {/* Dark/Light Btn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isDark ? (
          <RiSunLine
            onClick={() => setIsDark(!isDark)}
            className={styles.change__theme}
          />
        ) : (
          <RiMoonLine
            onClick={() => setIsDark(!isDark)}
            className={styles.change__theme}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'tween', delay: 0.5 }}
      >
        {router.locale === 'ar' ? (
          <Link href={router.asPath} locale='en'>
            <span className={styles.change__lang} title='English'>
              E
            </span>
          </Link>
        ) : (
          <Link href={router.asPath} locale='ar'>
            <span className={styles.change__lang} title='اللغة العربية'>
              ع
            </span>
          </Link>
        )}
      </motion.div>

      {/* Colors Theme Btns */}
      <motion.div
        className={styles.color__btns}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {colors.map((palette, index) => {
          const { color, hue, sat, lig } = palette
          return (
            <div
              onClick={() => handleColors(hue, sat, lig, index)}
              title={color}
              className={`${styles.color__btn} ${
                value === index && styles.color__btn__active
              }`}
              style={{
                backgroundColor: `hsl(${hue}, ${sat}, ${lig})`,
              }}
              key={index}
            />
          )
        })}
      </motion.div>
    </>
  )
}

export default Topbar
