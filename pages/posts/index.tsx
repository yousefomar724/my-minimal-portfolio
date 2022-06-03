import moment from 'moment'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import ColorThemesBtn from '../../components/colorThemesBtn'
import LightDarkBtn from '../../components/lightDarkBtn'
import { getPosts } from '../../services'
import { Edge } from '../../types'
import styles from './posts.module.css'

const Posts: NextPage<{ posts: Edge[] }> = (props) => {
  return (
    <div>
      <header className='profile container'>
        <LightDarkBtn />
        <ColorThemesBtn />
      </header>
      <div className='profile__container grid'>
        <div className='profile__data'>
          <h1 className={styles.posts__title}>My Blog</h1>
          {props.posts.map((post) => {
            const {
              slug,
              title,
              featuredImage: img,
              excerpt,
              categories,
              createdAt,
            } = post.node
            return (
              <div className='posts container' key={slug}>
                {img && (
                  <Image
                    src={img.url}
                    title={title}
                    width={500}
                    height={360}
                    objectFit='cover'
                    objectPosition='center'
                  />
                )}
                <div className='posts__content'>
                  <h3 className='posts__title'>{title}</h3>
                  <div className={styles.posts__metadata}>
                    <small className='posts__createdAt'>
                      {moment(createdAt).format(
                        'ddd, MMMM Do, YYYY, h:mm:ss A'
                      )}
                    </small>
                    <span className={styles.posts__cats}>
                      {categories.map((cat, index) => (
                        <span className={styles.posts__category} key={index}>
                          {cat.name}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <p className={styles.posts__excerpt}>
                  {excerpt.length > 100
                    ? `${excerpt.slice(0, 100)}...`
                    : excerpt}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Posts

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}
