import { Dispatch, SetStateAction, useState } from 'react'
import {
  RiMoonLine,
  RiDownloadLine,
  RiMessengerLine,
  RiWhatsappLine,
  RiSunLine,
} from 'react-icons/ri'
import data from '../data'

interface Props {
  dark: boolean
  setDark: Dispatch<SetStateAction<boolean>>
}
const Header = ({ dark, setDark }: Props) => {
  const [value, setValue] = useState(0)

  const {
    header: { socialLinks, experience, colors },
  } = data

  const toggleTheme = () => {
    setDark(!dark)
    localStorage.setItem('dark-theme', dark.toString())
  }

  const handleColors = (
    hue: string | null,
    sat: string | null,
    lig: string | null,
    index: number
  ) => {
    document.documentElement.style.setProperty('--hue', hue)
    document.documentElement.style.setProperty('--sat', sat)
    document.documentElement.style.setProperty('--lig', lig)
    setValue(index)
  }

  return (
    <header className='profile container'>
      {/* <!-- Theme button --> */}
      {dark ? (
        <RiSunLine onClick={() => toggleTheme()} className='change-theme' />
      ) : (
        <RiMoonLine onClick={() => toggleTheme()} className='change-theme' />
      )}

      {/* Colors Choose */}
      <div className='color-btns'>
        {colors.map((col, i) => {
          const { color, hue, sat, lig } = col
          return (
            <div
              onClick={() => handleColors(hue, sat, lig, i)}
              title={color}
              className={`color-btn ${value === i && 'color-btn-active'}`}
              style={{
                backgroundColor: `hsl(${hue}, ${sat}, ${lig})`,
              }}
              key={i}
            ></div>
          )
        })}
      </div>

      <div className='profile__container grid'>
        <div className='profile__data'>
          <div className='profile__border'>
            <div className='profile__perfil'>
              <img src='/me.png' alt='picture of me' />
            </div>
          </div>

          <h2 className='profile__name'>Yousef Omar</h2>
          <h3 className='profile__profession'>Web developer</h3>

          <ul className='profile__social'>
            {socialLinks.map((socialLink, i) => {
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

        <div className='profile__info grid'>
          {experience.map((item, i) => {
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
      </div>
    </header>
  )
}

export default Header
