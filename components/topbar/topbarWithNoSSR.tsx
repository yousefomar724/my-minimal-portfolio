import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('.'), {
  ssr: false,
})

export default function DynamicTopbar() {
  return <DynamicComponentWithNoSSR />
}
