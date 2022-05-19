import data from '../data'

const Experience = () => {
  return (
    <div className='profile__info grid'>
      {data.header.experience.map((item, i) => {
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
  )
}

export default Experience
