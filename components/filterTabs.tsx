import { Dispatch, SetStateAction } from 'react'
import data from '../data'

interface Props {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const FilterTabs = ({ value, setValue }: Props) => {
  return (
    <ul className='filters__content'>
      {data.tabs.map((tab, i) => {
        return (
          <button
            key={i}
            onClick={() => setValue(i)}
            className={`filters__button ${value === i && 'filter-tab-active'}`}
          >
            {tab.text}
          </button>
        )
      })}
    </ul>
  )
}

export default FilterTabs
