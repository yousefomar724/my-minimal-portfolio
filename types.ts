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
  content: { html: string }
}

export interface Author {
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
