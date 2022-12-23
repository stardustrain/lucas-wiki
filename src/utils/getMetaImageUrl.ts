import { getSrc } from 'gatsby-plugin-image'
import { isNil, drop } from 'lodash'

const getMetaImageUrl = (frontmatter: any) => {
  if (!isNil(frontmatter.image) && frontmatter.image.length > 0) {
    return frontmatter.image
  }

  if (isNil(frontmatter.featuredImage)) {
    return 'https://avatars.githubusercontent.com/u/107472329'
  }

  const featuredImageSrc = drop(getSrc(frontmatter.featuredImage)).join('')
  if (!isNil(featuredImageSrc) && featuredImageSrc.length > 0) {
    return `https://wiki.lucashan.space/${featuredImageSrc}`
  }
}

export default getMetaImageUrl