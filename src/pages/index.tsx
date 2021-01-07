import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'
import ReadTime from '../components/ArticleMeta'

const Header = styled.header`
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.07);
`

const H2 = styled.h2`
  border-bottom: 0;
  margin-bottom: 0;
`

const ArticleLink = styled(Link)`
  color: ${({ theme }) => theme.color.h2};
`

const Description = styled.p`
  color: ${({ theme }) => theme.color.description};
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/posts" (or the directory you specified
          for the "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <Header>
                  <H2>
                    <ArticleLink href={post.fields.slug}>
                      <span itemProp="headline">{title}</span>
                    </ArticleLink>
                  </H2>
                  <ReadTime date={post.frontmatter.date} readTime={post.timeToRead} />
                </Header>
                <section>
                  <Description
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
        html
        timeToRead
      }
    }
  }
`
