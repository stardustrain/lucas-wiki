import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { includes, isNil, uniq } from 'lodash'

import { useSelectedTagContext } from '../contexts/SelectedTagContext'
import { useSeriesContext } from '../contexts/SeriesContext'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'
import ArticleMeta from '../components/ArticleMeta'
import SeriesSelector from '../components/SeriesSelector'
import RemoveFilterButton from '../components/RemoveFilterButton'

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

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [tagList] = useState(
    uniq<string>(
      posts
        .flatMap(post => (Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : []))
        .sort((tagA, tagB) => tagA.localeCompare(tagB))
    )
  )
  const [seriesList] = useState(
    uniq<string>(
      posts
        .flatMap(post =>
          typeof post.frontmatter.series === 'string' ? [post.frontmatter.series] : []
        )
        .sort((seriesA, seriesB) => seriesA.localeCompare(seriesB))
    )
  )
  const {
    state: { selectedTag },
  } = useSelectedTagContext()
  const {
    state: { selectedSeries },
  } = useSeriesContext()
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
    selectedSeries === null
      ? posts
      : posts.filter(post => includes(post.frontmatter.series, selectedSeries))

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
        <FilterWrapper>
          <SeriesSelector seriesList={seriesList} />
          <RemoveFilterButton />
        </FilterWrapper>
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
      sort: { fields: [frontmatter___date], order: [DESC] }
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
          series
        }
        html
        timeToRead
      }
    }
  }
`
