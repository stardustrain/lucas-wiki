import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import rehypeReact from 'rehype-react'
import styled from '@emotion/styled'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'
import Disqus from '../components/Disqus'
import ArticleMeta from '../components/ArticleMeta'

// !HACK
// @ts-ignore
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // @ts-ignore
    a: Link,
  },
}).Compiler

const StyledLink = styled(GatsbyLink)`
  color: ${({ theme }) => theme.color.pirmaryGreen};
  font-weight: 600;

  :hover {
    text-decoration: underline;
  }
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
        </header>
        <ArticleMeta date={post.frontmatter.date} readTime={post.timeToRead} />
        <section itemProp="articleBody">{renderAst(post.htmlAst)}</section>
        <hr />
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <StyledLink to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </StyledLink>
            )}
          </li>
          <li>
            {next && (
              <StyledLink to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </StyledLink>
            )}
          </li>
        </ul>
      </nav>
      <Disqus url={location.href} identifier={post.id} title={post.frontmatter.title} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
