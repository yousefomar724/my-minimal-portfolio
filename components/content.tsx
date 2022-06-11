import { useState } from 'react'
import { Post, Project } from '../types'
import data from '../data'

interface Props {
  data: { posts: Post[]; projects: Project[] }
}

const Content = (props: Props) => {
  const [value, setValue] = useState<number>(0)
  return (
    <main className='container'>
      {/* Filter Tabs */}
      <ul className='filters__content'>
        {data.tabs.map((tab, i: number) => {
          return (
            <button
              key={i}
              onClick={() => setValue(i)}
              className={`filters__button ${
                value === i && 'filter-tab-active'
              }`}
            >
              {tab.text}
            </button>
          )
        })}
      </ul>
      {/* Filter Sections */}
      <div className='filters__sections'>
        {data?.sections?.map((SelectedSection, index) => (
          <div key={index}>
            {value === index && <SelectedSection data={props.data} />}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Content
