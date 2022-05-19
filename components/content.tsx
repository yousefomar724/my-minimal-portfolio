import { useState } from 'react'
import { Edge } from '../types'
import FilterSections from './filterSections'
import FilterTabs from './filterTabs'

const Content = ({ posts }: { posts: Edge[] }) => {
  const [value, setValue] = useState(0)
  return (
    <main className='container'>
      <FilterTabs value={value} setValue={setValue} />
      <FilterSections value={value} posts={posts} />
    </main>
  )
}

export default Content
