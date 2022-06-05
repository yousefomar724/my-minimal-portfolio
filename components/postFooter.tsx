import data from '../data'

const PostFooter = () => {
  return (
    <footer className='footer container'>
      <ul className='profile__social'>
        {data.header.socialLinks.map((socialLink, i) => {
          return (
            <a
              href={socialLink.url}
              target='_blank'
              rel='noreferrer'
              className='profile__social-link post__social-link'
              key={i}
            >
              <socialLink.icon />
            </a>
          )
        })}
      </ul>
      <span className='post__footer'>
        &#169; Yousef Omar. All rigths reserved
      </span>
    </footer>
  )
}

export default PostFooter
