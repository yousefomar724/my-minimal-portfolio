export interface DataProps {
  data: {
    postsConnection: {
      edges: {
        node: {
          title: string
          createdAt: Date
          categories: {
            name: string
            slug: string
          }[]
          slug: string
          content: {
            markdown: string
          }
          featuredImage: {
            url: string
            width: number
            height: number
          }
        }
      }[]
      pageInfo: {
        hasNextPage: boolean
        hasPreviousPage: boolean
        pageSize: number
      }
    }
  }
  revalidateOnFocus: boolean
}

export interface Results {
  data: Data
}

export interface Data {
  posts: Post[]
}

export interface Post {
  author: Author
  createdAt: Date
  slug: string
  title: string
  excerpt: string
  featuredImage: FeaturedImage
  categories: Category[]
  updatedAt?: string
  language: string
  content: { html: string; raw?: RawContent }
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Project {
  githubUrl: string
  image: Image
  previewUrl: string
  size: string
  slug: string
  title: string
  type: string
  updatedAt: Date
  description: string
  technologies: { name: string; url: string; image: Image }[]
}

export interface Author {
  position: string
  id: string
  name: string
  bio: string
  photo: Photo
}

export interface Photo {
  url: string
}

export interface Category {
  name: string
  slug: string
}

export interface FeaturedImage {
  url: string
  width: number
  height: number
}

export interface RawContent {
  children: RawContentChild[]
}

export interface RawContentChild {
  type: Type
  children: PurpleChild[]
  src?: string
  title?: string
  width?: number
  handle?: string
  height?: number
  mimeType?: string
}

export interface PurpleChild {
  text?: string
  code?: boolean
  id?: string
  rel?: string
  href?: string
  type?: string
  children?: FluffyChild[]
  openInNewTab?: boolean
}

export interface FluffyChild {
  text: string
  code?: boolean
}

export enum Type {
  CodeBlock = 'code-block',
  HeadingOne = 'heading-one',
  HeadingTwo = 'heading-two',
  HeadingThree = 'heading-three',
  HeadingFour = 'heading-four',
  Image = 'image',
  Paragraph = 'paragraph',
}
