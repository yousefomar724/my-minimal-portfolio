import '../styles/globals.css'
import '../node_modules/highlight.js/styles/night-owl.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
