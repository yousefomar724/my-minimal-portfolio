import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Profile, FavIcon, Content } from '../components'
import TopbarWithNoSSR from '../components/topbarWithNoSSR'
import { getHomePosts } from '../services'
import { Post, Project } from '../types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { posts, projects } = (await getHomePosts()) || []
  return {
    props: {
      posts,
      projects,
      ...(await serverSideTranslations(locale!, ['home', 'common'])),
      locale,
    },
    revalidate: 1,
  }
}

interface HomeProps {
  posts: Post[]
  projects: Project[]
  locale: string | undefined
}
const Home: NextPage<HomeProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div>
      <Head>
        <title>{t('common:my_name')}</title>
        <meta name='description' content='Generated by create next app' />
        <FavIcon />
      </Head>
      <header className='profile container'>
        <TopbarWithNoSSR />
        <Profile />
      </header>
      <Content data={props} />
      <motion.footer
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className='footer container'
      >
        <span className='footer__copy'>
          &#169; {t('common:my_name')}. {t('common:footer')}
        </span>
      </motion.footer>
    </div>
  )
}
export default Home
