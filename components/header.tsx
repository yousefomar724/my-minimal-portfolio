import ColorThemesBtn from './colorThemesBtn'
import ContactBtns from './contactBtns'
import Experience from './experience'
import LightDarkBtn from './lightDarkBtn'
import MainData from './mainData'
import SocialLinks from './socialLinks'

const Header = () => {
  return (
    <header className='profile container'>
      <LightDarkBtn />
      <ColorThemesBtn />
      <div className='profile__container grid'>
        <div className='profile__data'>
          <MainData />
          <SocialLinks />
        </div>
        <Experience />
        <ContactBtns />
      </div>
    </header>
  )
}

export default Header
