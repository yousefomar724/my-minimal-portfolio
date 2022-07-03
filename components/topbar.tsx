import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Topbar = () => {
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

  const { t } = useTranslation()
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
        transition={{ delay: 2 }}
      >
        {isDark ? (
          <RiSunLine
            onClick={() => setIsDark(!isDark)}
            className='change-theme'
          />
        ) : (
          <RiMoonLine
            onClick={() => setIsDark(!isDark)}
            className='change-theme'
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'tween', delay: 2 }}
      >
        {router.locale === 'ar' ? (
          <Link href={router.asPath} locale='en'>
            <span className='change-lang' title='English'>
              E
            </span>
          </Link>
        ) : (
          <Link href={router.asPath} locale='ar'>
            <span className='change-lang' title='اللغة العربية'>
              ع
            </span>
          </Link>
        )}
      </motion.div>

      {/* Colors Theme Btns */}
      <motion.div
        className='color-btns'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {colors.map((palette, index) => {
          const { color, hue, sat, lig } = palette
          return (
            <div
              onClick={() => handleColors(hue, sat, lig, index)}
              title={color}
              className={`color-btn ${value === index && 'color-btn-active'}`}
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
