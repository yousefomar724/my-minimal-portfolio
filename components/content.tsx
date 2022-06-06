import { useState } from 'react'
import data from '../data'
import { Post } from '../types'

const Content = ({ posts }: { posts: Post[] }) => {
  const [value, setValue] = useState(0)
  return (
    <main className='container'>
      {/* Filter Tabs */}
      <ul className='filters__content'>
        {data.tabs.map((tab, i) => {
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
        {data.sections.map((SelectedSection, index) => (
          <div key={index}>
            {value === index && <SelectedSection posts={posts} />}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Content
