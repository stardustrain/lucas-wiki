import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { includes, isNil, uniq } from 'lodash'

import { useSelectedTagContext } from '../contexts/SelectedTagContext'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'
import ArticleMeta from '../components/ArticleMeta'
import TagSelector from '../components/TagSelector'

const Header = styled.header`
  border-bottom: 1px solid hsla(var(--text-base), 40%, 25%);
  padding-bottom: ${({ theme }) => theme.spacing1};
`

const H2 = styled.h2`
  border-bottom: 0;
  margin-bottom: 0;
`

const ArticleLink = styled(Link)`
  color: ${({ theme }) => theme.color.textPrimary};
`

const Description = styled.p`
  color: ${({ theme }) => theme.color.textSecondary};
`

const PostContainer = styled.div`
  position: relative;
  list-style: none;
  min-height: 100vh;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [tagList] = useState<string[]>(
    uniq(
      posts
        .flatMap(post => (Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : []))
        .sort((tagA, tagB) => tagA.localeCompare(tagB))
    )
  )
  const {
    state: { selectedTag },
  } = useSelectedTagContext()
  const divRef = useRef<HTMLDivElement>(null)

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

  const filteredPosts =
    selectedTag === 'all' || selectedTag === null
      ? posts
      : posts.filter(post => includes(post.frontmatter.tags, selectedTag))

  useEffect(() => {
    if (isNil(selectedTag)) {
      return
    }

    if (divRef.current) {
      const top = divRef.current.offsetTop
      window.scrollTo({
        top: top + 1,
        behavior: 'smooth',
      })
    }
  }, [selectedTag])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <PostContainer ref={divRef}>
        <TagSelector tagList={tagList} />
        <ol style={{ listStyle: 'none' }}>
          {filteredPosts.map(post => {
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
                    <ArticleMeta
                      date={post.frontmatter.date}
                      readTime={post.timeToRead}
                      tags={post.frontmatter.tags}
                    />
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
      </PostContainer>
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
    allMarkdownRemark(
      filter: { frontmatter: { title: { ne: "Introduce Keuntaek Lucas Han" } } }
      sort: { fields: [frontmatter___date, frontmatter___url], order: [DESC, ASC] }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
        html
        timeToRead
      }
    }
  }
`
