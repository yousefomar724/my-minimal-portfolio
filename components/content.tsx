import { useState } from 'react'
import { Post, Project } from '../types'
import { motion } from 'framer-motion'
import data from '../data'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface Props {
  data: { posts: Post[]; projects: Project[] }
}

const Content = (props: Props) => {
  const [value, setValue] = useState<number>(0)
  const { t } = useTranslation()
  const router = useRouter()
  const tabs = [t('home:projects'), t('home:skills'), t('home:posts')]
  return (
    <main className='container'>
      {/* Filter Tabs */}
      <motion.ul
        style={router.locale === 'ar' ? { direction: 'rtl' } : {}}
        className='filters__content'
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {tabs.map((tab, i: number) => {
          return (
            <button
              key={i}
              onClick={() => setValue(i)}
              className={`filters__button ${
                value === i && 'filter-tab-active'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </motion.ul>
      {/* Filter Sections */}
      <motion.div
        className='filters__sections'
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {data?.sections?.map((SelectedSection, index) => (
          <div key={index}>
            {value === index && <SelectedSection data={props.data} />}
          </div>
        ))}
      </motion.div>
    </main>
  )
}

export default Content
