import data from '../data'

const SocialLinks = () => {
  return (
    <ul className='profile__social'>
      {data.header.socialLinks.map((socialLink, i) => {
        return (
          <a
            href={socialLink.url}
            target='_blank'
            rel='noreferrer'
            className='profile__social-link'
            key={i}
          >
            <socialLink.icon />
          </a>
        )
      })}
    </ul>
  )
}

export default SocialLinks
