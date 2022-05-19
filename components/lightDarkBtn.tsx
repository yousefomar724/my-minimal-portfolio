import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

const LightDarkBtn = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(dark)
    document.body.classList.toggle('dark-theme', dark)
  }, [dark])

  return (
    <>
      {dark ? (
        <RiSunLine onClick={() => setDark(!dark)} className='change-theme' />
      ) : (
        <RiMoonLine onClick={() => setDark(!dark)} className='change-theme' />
      )}
    </>
  )
}

export default LightDarkBtn
