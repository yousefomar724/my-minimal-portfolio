import '../styles/globals.css'
import '../node_modules/highlight.js/styles/night-owl.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { AnimatePresence, motion } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  const pageVariants = {
    pageInitial: {
      opacity: 0,
    },
    pageAnimate: {
      opacity: 1,
    },
    pageExit: {
      opacity: 0,
    },
  }
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial='pageInitial'
        animate='pageAnimate'
        exit='pageExit'
        variants={pageVariants}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}

export default appWithTranslation(MyApp)
