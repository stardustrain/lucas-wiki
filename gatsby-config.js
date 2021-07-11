const siteMetadata = {
  title: 'Lucas wiki',
  author: {
    name: `Keuntaek Lucas Han`,
    summary: `I'm Frontend engineer who loves functional programming, interested in writing solid and beautiful code and testing.`,
  },
  description: `Personal blog by Lucas Han. Where I wrote my thoughts freely.`,
  siteUrl: `https://wiki.lucashan.space/`,
  social: {
    twitter: `https://twitter.com/lucashan13`,
    facebook: 'https://www.facebook.com/veritaslux',
    github: 'https://github.com/stardustrain',
    linkedin: 'https://www.linkedin.com/in/lucas-keun-taek-han-443b08120/',
  },
  resume: '/intro/',
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
      showDiffHighlight: true,
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
  {
    resolve: 'gatsby-remark-custom-blocks',
    options: {
      blocks: {
        danger: {
          classes: 'danger',
          title: 'optional',
        },
        info: {
          classes: 'info',
          title: 'optional',
        },
        tip: {
          classes: 'tip',
          title: 'optional',
        },
        warning: {
          classes: 'warning',
          title: 'optional',
        },
      },
    },
  },
]

const getFavicons = () =>
  [1, 2, 3, 4, 8, 16].map(num => ({
    src: `content/assets/favicons/favicon-${num * 16}.png`,
    sizes: `${num * 16}x${num * 16}`,
    type: 'image/png',
  }))

const plugins = [
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
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-feed`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Lucas wiki`,
      short_name: `LucasWiki`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `content/assets/icon.png`,
      icons: getFavicons(),
    },
  },
  `gatsby-plugin-react-helmet`,
  'gatsby-plugin-sitemap',
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
  `gatsby-plugin-postcss`,
  {
    resolve: 'gatsby-plugin-vercel',
    options: {
      // (optional) Prints metrics in the console when true
      debug: false,
    },
  },
]

if (process.env.GA_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GA_TRACKING_ID,
    },
  })
}

module.exports = {
  siteMetadata,
  plugins,
}
