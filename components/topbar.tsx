import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import data from '../data'

const Topbar = () => {
  const [value, setValue] = useState(0)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(dark)
    document.body.classList.toggle('dark-theme', dark)
  }, [dark])

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
      {dark ? (
        <RiSunLine onClick={() => setDark(!dark)} className='change-theme' />
      ) : (
        <RiMoonLine onClick={() => setDark(!dark)} className='change-theme' />
      )}

      {/* Colors Theme Btns */}
      <div className='color-btns'>
        {data.header.colors.map((palette, i) => {
          const { color, hue, sat, lig } = palette
          return (
            <div
              onClick={() => handleColors(hue, sat, lig, i)}
              title={color}
              className={`color-btn ${value === i && 'color-btn-active'}`}
              style={{
                backgroundColor: `hsl(${hue}, ${sat}, ${lig})`,
              }}
              key={i}
            />
          )
        })}
      </div>
    </>
  )
}

export default Topbar
