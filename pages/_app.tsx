import '../styles/globals.css'
import '../node_modules/highlight.js/styles/night-owl.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
