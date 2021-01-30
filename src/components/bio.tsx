/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from '@emotion/styled'

import Icon from './Icon'
import ExternalLink from './ExternalLink'

const BioLayout = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing12};

  p {
    margin-bottom: ${({ theme }) => theme.spacing1};
  }
`

const BioImage = styled(Image)`
  margin-right: ${({ theme }) => theme.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing0};
  min-width: 50px;
  border-radius: 100%;
`

const BioLinks = styled.div`
  a:not(:first-of-type) {
    margin-left: 10px;
  }
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <BioLayout className="bio">
      {avatar && (
        <BioImage
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <div>
        {author?.name && (
          <p>
            Written by <strong>{author.name}</strong>.
            <br />
            {author?.summary || null}
          </p>
        )}
        <BioLinks>
          {social?.github && (
            <ExternalLink ariaLabel="Author's github profile" href={social?.github}>
              <Icon name="Github" ariaHidden />
            </ExternalLink>
          )}
          {social?.twitter && (
            <ExternalLink ariaLabel="Author's twitter" href={social?.twitter}>
              <Icon name="Twitter" ariaHidden />
            </ExternalLink>
          )}
          {social?.linkedin && (
            <ExternalLink ariaLabel="Author's linkedin" href={social?.linkedin}>
              <Icon name="LinkedIn" ariaHidden />
            </ExternalLink>
          )}
        </BioLinks>
      </div>
    </BioLayout>
  )
}

export default Bio
