export interface Author {
  id: string
  name: string
  bio: string
  photo: FeaturedImage
}

export interface FeaturedImage {
  url: string
}

export interface Category {
  name: string
  slug: string
}

export interface Node {
  author: Author
  createdAt: Date
  slug: string
  title: string
  excerpt: string
  featuredImage: FeaturedImage
  categories: Category[]
}

export interface Edge {
  node: Node
}

export interface PostsConnection {
  edges: Edge[]
}

export type Color = string | null
