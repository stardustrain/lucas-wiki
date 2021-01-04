const siteMetadata = {
  title: ``,
  author: {
    name: `Keuntaek Lucas Han`,
    summary: `I'm Frontend engineer who loves functional programming, interested in writing solid and beautiful code and testing.`,
  },
  description: ``,
  siteUrl: `https://wiki.lucashan.space/`,
  social: {
    twitter: `lucashan13`,
    facebook: 'https://www.facebook.com/veritaslux',
    github: 'https://github.com/stardustrain',
    linkedin: 'https://www.linkedin.com/in/lucas-keun-taek-han-443b08120/',
  },
}

const remarkPlugins = [
  {
    resolve: 'gatsby-remark-autolink-headers',
    options: {
      offsetY: '10',
      elements: ['h2', 'h3'],
    },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 630,
    },
  },
  {
    resolve: `gatsby-remark-responsive-iframe`,
    options: {
      wrapperStyle: `margin-bottom: 1.0725rem`,
    },
  },
  {
    resolve: 'gatsby-remark-prismjs',
    options: {
      showLineNumbers: true,
      noInlineHighlight: false,
    },
  },
  `gatsby-remark-copy-linked-files`,
  `gatsby-remark-smartypants`,
  {
    resolve: 'gatsby-remark-emojis',
    options: {
      active: true,
      size: 16,
      styles: {
        margin: 0,
      },
    },
  },
]

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: remarkPlugins,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    'gatsby-plugin-emotion',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
