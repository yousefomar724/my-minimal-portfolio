import Image from 'next/image'

const MainData = () => {
  return (
    <>
      <div className='profile__border'>
        <div className='profile__img'>
          <Image
            width='120px'
            height='120px'
            src='/me.png'
            alt='picture of me'
          />
        </div>
      </div>
      <h2 className='profile__name'>Yousef Omar</h2>
      <h3 className='profile__profession'>Web developer</h3>
    </>
  )
}

export default MainData
