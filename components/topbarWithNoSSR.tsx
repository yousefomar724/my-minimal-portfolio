import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('./topbar'), {
  ssr: false,
})

export default () => <DynamicComponentWithNoSSR />