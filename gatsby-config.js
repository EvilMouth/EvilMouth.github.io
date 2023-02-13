module.exports = {
  siteMetadata: {
    title: `Evil Mouth`,
    author: {
      name: `Evil Mouth`,
      summary: `who lives and works in China building useful things.`,
    },
    description: `Learn. Record. To consolidate.`,
    siteUrl: `https://evilmouth.net`,
    social: {
      twitter: `EvilLittleMouth`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/_posts`,
        name: `blog`,
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
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `remark-images-jsdelivr`,
            options: {
              enabled: true,
              prefix: `https://cdn.jsdelivr.net/gh/EvilMouth/EvilMouth.github.io@gh-pages`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        siteId: `a23fc26fb8c87ab6a05607681dd70056`,
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `G-3SLDCRTZ6M`
        ],
        pluginConfig: {
          head: false,
        }
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Evil Mouth`,
        short_name: `evilmouth`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
  ],
}
