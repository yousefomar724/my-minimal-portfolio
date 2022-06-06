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

export const getHomePosts = async () => {
  const query = gql`
    query homePosts {
      posts(first: 4, orderBy: createdAt_DESC) {
        title
        slug
        createdAt
        excerpt
        categories {
          id
          name
          slug
        }
      }
    }
  `
  const results = await request(GRAPHCMS_ENDPOINT, query)
  return results.posts
}

export const getPost = async (slug: string) => {
  const query = gql`
    query getPost($slug: String) {
      posts(where: { slug: $slug }) {
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
  return results.posts[0]
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
