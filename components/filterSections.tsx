import data from '../data'
import { Edge } from '../types'

interface Props {
  value: number
  posts: Edge[]
}

const FilterSections = (props: Props) => {
  const { value, posts } = props
  return (
    <div className='filters__sections'>
      {data.sections.map((SelectedSection, index) => (
        <div key={index}>
          {value === index && <SelectedSection posts={posts} />}
        </div>
      ))}
    </div>
  )
}

export default FilterSections
