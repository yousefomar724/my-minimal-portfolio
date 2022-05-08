import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import FilterTabs from '../components/filterTabs'
import Footer from '../components/footer'
import Header from '../components/header'
import Projects from '../components/projects'
import Skills from '../components/skills'

const Home: NextPage = () => {
  const [value, setValue] = useState(0)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(dark)
    document.body.classList.toggle('dark-theme', dark)
  }, [dark])

  return (
    <div>
      <Head>
        <title>Yousef Omar</title>
        <meta name='description' content='Generated by create next app' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>

      <Header dark={dark} setDark={setDark} />
      <main className='main'>
        <section className='filters container'>
          <FilterTabs value={value} setValue={setValue} />
          <div className='filters__sections'>
            {value === 0 ? <Projects /> : <Skills />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
