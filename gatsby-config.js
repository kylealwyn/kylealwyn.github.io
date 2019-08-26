const siteDescription =
  'Kyle Alwyn is a full stack javascript developer and immersive experience designer based in San Francisco, California.';

module.exports = {
  siteMetadata: {
    title: 'Kyle Alwyn',
    author: `Kyle Alwyn`,
    description: siteDescription,
    siteUrl: `https://kylealwyn.com`,
    social: {
      twitter: `kjalwyn`,
    },
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svgs/,
        },
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
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-66504866-1',
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        lang: 'en',
        dir: 'ltr',
        name: 'Kyle Alwyn',
        short_name: 'Kyle Alwyn',
        description: siteDescription,
        scope: '/',
        display: 'fullscreen',
        orientation: 'portrait',
        theme_color: '#e64c67',
        background_color: '#e64c67',
        icon: './static/favicon.png',
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
};
