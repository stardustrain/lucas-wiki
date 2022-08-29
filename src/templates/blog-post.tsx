import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import rehypeReact from 'rehype-react'
import styled from '@emotion/styled'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'
import ArticleMeta from '../components/ArticleMeta'
import CopyLinkToClipboardButton from '../components/CopyLinkToClipboardButton'
import OverflowX from '../components/OverflowX'
import Disclosure from '../components/Disclosure'
import ProgressBar from '../components/ProgressBar'
import Comments from '../components/Comments'

import getMetaImageUrl from '../utils/getMetaImageUrl'

import type { WindowLocation } from '@reach/router'

// !HACK
// @ts-ignore
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // @ts-ignore
    a: Link,
    // @ts-ignore
    'overflow-x': OverflowX,
    // @ts-ignore
    disclosure: Disclosure,
  },
}).Compiler

const StyledLink = styled(GatsbyLink)`
  color: ${({ theme }) => theme.color.pirmaryGreen};
  font-weight: 600;

  :hover {
    text-decoration: underline;
  }
`

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing5};
`

const H1 = styled.h1`
  display: inline;
  margin: ${({ theme }) => `${theme.spacing0}`};
  padding: 0;
  vertical-align: middle;
`

const isIntroPage = (slug: string) => /about/.test(slug)

type Props = {
  location: WindowLocation
  data: any // !HACK
}

const BlogPostTemplate = ({ data, location }: Props) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const disableComments = !!post.frontmatter.disableComments
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.seoDate,
    dateModified: post.fields.gitModifiedAt,
    wordCount: post.wordCount.words,
    author: {
      '@type': 'Person',
      name: data.site.siteMetadata.author.name,
    },
    keywords: post.frontmatter.keywords,
    description: post.frontmatter.description || post.excerpt,
  }
  const imageUrl = getMetaImageUrl(post.frontmatter)

  const metaImages = [
    {
      property: 'og:image',
      content: imageUrl,
    },
    {
      property: 'twitter:image',
      content: imageUrl,
    },
  ]
  const articleMeta = [
    {
      property: 'article:published_time',
      content: post.frontmatter.seoDate,
    },
    {
      property: 'article:modified_time',
      content: post.fields.gitModifiedAt,
    },
  ]

  return (
    <Layout location={location} title={siteTitle} disableSkipLink>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        slug={post.fields.slug}
        keywords={post.frontmatter.keywords}
        jsonLd={jsonLd}
        meta={metaImages.concat(articleMeta)}
      />
      <ProgressBar />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <Header>
          <H1 itemProp="headline">{post.frontmatter.title}</H1>
          <CopyLinkToClipboardButton />
        </Header>
        {isIntroPage(post.fields.slug) ? null : (
          <ArticleMeta
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            readTime={post.timeToRead}
            author={data.site.siteMetadata.author.name}
            frontMatter={post.frontmatter}
          />
        )}
        <section itemProp="articleBody">{renderAst(post.htmlAst)}</section>
        <hr />
      </article>
      {isIntroPage(post.fields.slug) ? null : (
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
              {previous && !isIntroPage(previous.fields.slug) && (
                <StyledLink to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </StyledLink>
              )}
            </li>
            <li>
              {next && !isIntroPage(next.fields.slug) && (
                <StyledLink to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </StyledLink>
              )}
            </li>
          </ul>
        </nav>
      )}
      {disableComments ? null : <Comments />}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      timeToRead
      wordCount {
        words
      }
      fields {
        slug
        gitModifiedAt
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        seoDate: date
        description
        url
        keywords
        disableComments
        image
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
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
