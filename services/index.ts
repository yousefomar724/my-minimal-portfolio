import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUPLIC_GRAPHCMS_ENDPOINT!
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              id
              name
              bio
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const results = await request(graphqlAPI, query)
  return results.postsConnection.edges
}
