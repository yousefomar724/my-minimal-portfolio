import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import data from '../data'

const Topbar = () => {
  const [value, setValue] = useState(0)
  const [dark, setDark] = useState(
    document.body.classList.contains('dark-theme')
  )

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
        {data.header.colors.map((palette, index) => {
          const { color, hue, sat, lig } = palette
          useEffect(() => {
            setValue((prevValue) => {
              if (
                document.documentElement.style.getPropertyValue('--hue') === hue
              ) {
                return index
              }
              return prevValue
            })
          })
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
