type FeaturedImage = {
  childImageSharp: {
    gatsbyImageData: ImageDataLike
  }
}

type Frontmatter = {
  date: string
  title: string
  description: string
  tags: string[]
  series?: string
  image?: string
  featuredImage?: FeaturedImage
}

type PostNode = {
  excerpt: string
  fields: { slug: string }
  frontmatter: Frontmatter
  html: string
  timeToRead: number
}

type Site = {
  siteMetadata: {
    title: string
    author: {
      name: string
    }
  }
}

type AllMarkdownRemark = {
  nodes: PostNode[]
}
