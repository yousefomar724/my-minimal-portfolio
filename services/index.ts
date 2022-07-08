import request, { gql } from 'graphql-request'

export const GRAPHCMS_ENDPOINT =
  'https://api-eu-central-1.graphcms.com/v2/cl3bh5brj25kk01xi7sea1v73/master'

export const getAllPosts = async () => {
  const query = gql`
    query allPosts {
      postsConnection(orderBy: createdAt_DESC, first: 5, skip: 0) {
        edges {
          node {
            title
            createdAt
            excerpt
            categories {
              name
              slug
            }
            slug
            content {
              markdown
            }
            featuredImage {
              url
              width
              height
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `
  const results = await request(GRAPHCMS_ENDPOINT, query)
  return results
}

export const getAllProjects = async () => {
  const query = gql`
    query allprojects {
      projectsConnection(orderBy: updatedAt_ASC, first: 5, skip: 0) {
        edges {
          node {
            description
            id
            image {
              height
              url
            }
            previewUrl
            slug
            size
            technologies {
              image {
                height
                url
                width
              }
              url
              name
            }
            title
            type
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          pageSize
        }
      }
    }
  `
  const results = await request(GRAPHCMS_ENDPOINT, query)
  return results
}

export const getHomePosts = async () => {
  const query = gql`
    query homePosts {
      posts(first: 4, orderBy: createdAt_DESC) {
        title
        slug
        language
        createdAt
        excerpt
        categories {
          id
          name
          slug
        }
      }
      projects(first: 4, orderBy: updatedAt_DESC) {
        githubUrl
        image {
          height
          url
          width
        }
        previewUrl
        description
        size
        slug
        title
        technologies {
          name
          url
          image {
            url
            width
            height
          }
        }
        type
        updatedAt
      }
    }
  `
  const results = await request(GRAPHCMS_ENDPOINT, query)
  return results
}

export const getPost = async (slug: string) => {
  const query = gql`
    query getPost($slug: String) {
      posts(where: { slug: $slug }) {
        title
        content {
          html
          raw
        }
        createdAt
        language
        excerpt
        categories {
          name
          slug
        }
        author {
          name
          photo {
            url
          }
          position
        }
        featuredImage {
          url
          width
          height
        }
        slug
        updatedAt
      }
    }
  `
  const slugName = { slug }
  const results = await request(GRAPHCMS_ENDPOINT, query, slugName)
  return results.posts[0]
}
export const getPostsByCategory = async (slug: string) => {
  const query = gql`
    query getPostsByCategory($slug: String) {
      posts(
        where: { categories_some: { slug: $slug } }
        orderBy: updatedAt_DESC
      ) {
        title
        content {
          html
        }
        createdAt
        excerpt
        categories {
          name
          slug
        }
        author {
          name
          photo {
            url
          }
          position
        }
        featuredImage {
          url
          width
          height
        }
        slug
        updatedAt
      }
    }
  `
  const slugName = { slug }
  const results = await request(GRAPHCMS_ENDPOINT, query, slugName)
  return results.posts
}

export const getPostsSlugs = async () => {
  const query = gql`
    {
      posts {
        slug
      }
    }
  `
  const results = await request(GRAPHCMS_ENDPOINT, query)
  return results.posts
}

export const getCategoriesSlugs = async () => {
  const query = gql`
    {
      categories {
        slug
      }
    }
  `
  const results = await request(GRAPHCMS_ENDPOINT, query)
  return results.categories
}
