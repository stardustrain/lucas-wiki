/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
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

const BioImage = styled(GatsbyImage)`
  margin-right: ${({ theme }) => theme.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing0};
  min-width: 50px;
  border-radius: 100%;
`

const BioLinks = styled.ul`
  list-style: none;

  li {
    display: inline-block;
  }

  li:not(:first-of-type) {
    margin-left: 10px;
  }
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 50, height: 50, quality: 95)
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
          resume
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const resume = data.site.siteMetadata?.resume

  const avatar = data?.avatar?.childImageSharp?.gatsbyImageData

  return (
    <BioLayout className="bio">
      {avatar ? (
        resume ? (
          <Link to={resume}>
            <BioImage
              image={avatar}
              alt={author?.name || ``}
              className="bio-avatar"
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
          </Link>
        ) : (
          <BioImage
            image={avatar}
            alt={author?.name || ``}
            className="bio-avatar"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        )
      ) : null}
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
            <li>
              <ExternalLink ariaLabel="Author's github profile" href={social?.github}>
                <Icon name="Github" ariaHidden />
              </ExternalLink>
            </li>
          )}
          {social?.twitter && (
            <li>
              <ExternalLink ariaLabel="Author's twitter" href={social?.twitter}>
                <Icon name="Twitter" ariaHidden />
              </ExternalLink>
            </li>
          )}
          {social?.linkedin && (
            <li>
              <ExternalLink ariaLabel="Author's linkedin" href={social?.linkedin}>
                <Icon name="LinkedIn" ariaHidden />
              </ExternalLink>
            </li>
          )}
          {resume && (
            <li>
              <Link to={resume}>
                <Icon name="Resume" size={20} ariaHidden />
              </Link>
            </li>
          )}
        </BioLinks>
      </div>
    </BioLayout>
  )
}

export default Bio
