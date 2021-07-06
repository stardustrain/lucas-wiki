type Frontmatter = {
  date: string
  title: string
  description: string
  tags: string[]
  series?: string
}

type PostNode = {
  excerpt: string
  fields: { slug: string }
  frontmatter: Frontmatter
  html: string
  timeToRead: number
}

type Site = {
  siteMetadata: { title: string }
}

type AllMarkdownRemark = {
  nodes: PostNode[]
}
