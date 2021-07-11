import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { isNil, uniq, flatMap } from 'lodash'

import { useSeriesContext } from '../contexts/SeriesContext'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'
import ArticleMeta from '../components/ArticleMeta'
import SeriesSelector from '../components/SeriesSelector'
import RemoveFilterButton from '../components/RemoveFilterButton'

import type { WindowLocation } from '@reach/router'

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
  position: sticky;
  top: -1px;
  background-color: ${({ theme }) => theme.color.background};
  padding: ${({ theme }) => `${theme.spacing2} 0`};

  & > :not(style) ~ :not(style) {
    margin-inline-start: 3px;
  }

  @media (max-width: 42rem) {
    width: 100%;
    & > :not(style) ~ :not(style) {
      margin-inline-start: 5px;
    }
  }
`

interface Props {
  data: {
    site: Site
    allMarkdownRemark: AllMarkdownRemark
  }
  location: WindowLocation
}

const BlogIndex = ({ data, location }: Props) => {
  const [top, setTop] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const seriesList = uniq(
    flatMap(posts, post =>
      typeof post.frontmatter.series === 'string' ? [post.frontmatter.series] : []
    ).sort((seriesA, seriesB) => seriesA.localeCompare(seriesB))
  )
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
      : posts.filter(
          post => post.frontmatter.series?.replace(/\s/g, '-').toLowerCase() === selectedSeries
        )

  useEffect(() => {
    if (divRef.current) {
      setTop(divRef.current.offsetTop)
    }
  }, [])

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }

    if (divRef.current === null) {
      return
    }

    if (isNil(selectedSeries)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    window.scrollTo({
      top: top ?? divRef.current.offsetTop,
      behavior: 'smooth',
    })
  }, [selectedSeries, top, mounted])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <PostContainer ref={divRef} id="post-container">
        <FilterWrapper>
          <SeriesSelector seriesList={seriesList} />
          <RemoveFilterButton disabled={selectedSeries === null} />
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
