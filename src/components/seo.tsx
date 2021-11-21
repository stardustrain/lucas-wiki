/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { isPlainObject } from 'lodash'

type Props = {
  description?: string
  lang?: string
  meta?: { property: string; content: any }[]
  title: string
  slug?: string
  keywords?: string[]
  jsonLd?: Record<string, any>
}

const SEO = ({
  description = '',
  lang = 'ko',
  meta = [],
  title,
  slug,
  keywords,
  jsonLd,
}: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl

  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: 'keywords',
      content: keywords ?? '',
    },
    {
      property: 'og:site_name',
      content: 'wiki.lucashan.space',
    },
    {
      property: 'og:locale',
      content: 'ko_KR',
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: 'og:url',
      content: slug ? `${siteUrl}${slug}` : siteUrl,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: 'twitter:url',
      content: slug ? `${siteUrl}${slug}` : siteUrl,
    },
  ].concat(meta)

  if (process.env.GATSBY_GOOGLE_SITE_VERIFICATION) {
    metaTags.push({
      name: 'google-site-verification',
      content: process.env.GATSBY_GOOGLE_SITE_VERIFICATION,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={metaTags}
    >
      {isPlainObject(jsonLd) ? (
        <script type="application/ld+json">{`${JSON.stringify(jsonLd)}`}</script>
      ) : null}
    </Helmet>
  )
}

export default SEO
