import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import data from '../data'

const Topbar = () => {
  const [value, setValue] = useState(0)
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('portfolio-dark-theme')!) || false
  )

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
    data.header.colors.map((color, index) => {
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
  return (
    <>
      {/* Dark/Light Btn */}
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

      {/* Colors Theme Btns */}
      <div className='color-btns'>
        {data.header.colors.map((palette, index) => {
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
      </div>
    </>
  )
}

export default Topbar
