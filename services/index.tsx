import request, { gql } from 'graphql-request'
import React, { ReactNode } from 'react'
import Highlight from 'react-highlight'
import { Type } from '../types'

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
      projects(first: 4, orderBy: createdAt_DESC) {
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

export const allPostsQuery = `query allPosts($skip: Int) {
      postsConnection(orderBy: createdAt_DESC, first: 5, skip: $skip) {
        edges {
          node {
            title
            createdAt
            excerpt
            language
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
    }`

export const getContentFragment = (
  index: number,
  text: string | ReactNode,
  obj?: any,
  type?: Type
) => {
  let modifiedText: any = text

  if (obj) {
    if (obj.bold) {
      modifiedText = <b key={index}>{text}</b>
    }

    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>
    }

    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>
    }
    if (obj.code) {
      modifiedText = <code key={index}>{text}</code>
    }
    if (obj.type === 'link') {
      modifiedText = (
        <a key={index} href={obj?.href} target='_blank' rel='noreferrer'>
          {obj?.children?.map((item: any, i: number) => {
            if (item?.code) {
              return <code key={i}>{item.text}</code>
            }
            if (item.type === 'link') {
              return (
                <React.Fragment key={i}>{item.children[0].text}</React.Fragment>
              )
            }
            return <React.Fragment key={i}>{item.text}</React.Fragment>
          })}
        </a>
      )
    }
  }

  switch (type) {
    case 'heading-one':
      return (
        <h1 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      )
    case 'heading-four':
      return (
        <h4 key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      )
    case 'bulleted-list':
      return (
        <ul key={index}>
          {obj.children.map((item: any, i: number) => (
            <React.Fragment key={i}>
              {item.children.map((childItem: any, childI: number) => (
                <React.Fragment key={childI}>
                  {childItem.children.map(
                    (grandChildItem: any, grandChildI: number) => (
                      <li key={grandChildI}>{grandChildItem.text}</li>
                    )
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )
    case 'paragraph':
      return (
        <p key={index}>
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      )
    case 'code-block':
      return <Highlight key={index}>{modifiedText}</Highlight>
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      )
    default:
      return modifiedText
  }
}
