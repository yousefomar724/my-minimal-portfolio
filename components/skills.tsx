import data from '../data'

const Skills = () => {
  const {
    skills: { frontend, backend },
  } = data
  return (
    <div className='skills__content grid'>
      <div className='skills__area'>
        <h3 className='skills__title'>{frontend.title}</h3>

        <div className='skills__box'>
          <div className='skills__group'>
            {frontend.frontendSkills.slice(0, 3).map((skill, i) => {
              return (
                <div className='skills__data' key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className='skills__name'>{skill.tech}</h3>
                    <span className='skills__level'>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='skills__group'>
            {frontend.frontendSkills.slice(3, 6).map((skill, i) => {
              return (
                <div className='skills__data' key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className='skills__name'>{skill.tech}</h3>
                    <span className='skills__level'>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='skills__area'>
        <h3 className='skills__title'>{backend.title}</h3>

        <div className='skills__box'>
          <div className='skills__group'>
            {backend.backendSkills.slice(0, 3).map((skill, i) => {
              return (
                <div className='skills__data' key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className='skills__name'>{skill.tech}</h3>
                    <span className='skills__level'>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='skills__group'>
            {backend.backendSkills.slice(3, 5).map((skill, i) => {
              return (
                <div className='skills__data' key={i}>
                  <i className='ri-checkbox-circle-line'></i>

                  <div>
                    <h3 className='skills__name'>{skill.tech}</h3>
                    <span className='skills__level'>{skill.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
