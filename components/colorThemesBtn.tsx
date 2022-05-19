import { useState } from 'react'
import { Color } from '../types'
import data from '../data'

const ColorThemesBtn = () => {
  const [value, setValue] = useState(0)

  const handleColors = (hue: Color, sat: Color, lig: Color, index: number) => {
    document.documentElement.style.setProperty('--hue', hue)
    document.documentElement.style.setProperty('--sat', sat)
    document.documentElement.style.setProperty('--lig', lig)
    setValue(index)
  }

  return (
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
  )
}

export default ColorThemesBtn
