const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects () {
    return [
      {
        source: '/:path/event-setup',
        destination: '/:path/event-setup/home-page',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/leaflet/dist/images',
            to: path.resolve(__dirname, 'public', 'leaflet', 'images')
          },
        ],
      }),
    )
    return config
  },
  // reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'id-ID'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
  publicRuntimeConfig: {
    API_HOST_AUTH: `${process.env.API_HOST_AUTH}${process.env.API_VERSION_AUTH ? `/${process.env.API_VERSION_AUTH}` : ''}`,
    API_HOST_EVENT: `${process.env.API_HOST_EVENT}${process.env.API_VERSION_EVENT ? `/${process.env.API_VERSION_EVENT}` : ''}`,
    API_HOST_ADMIN: `${process.env.API_HOST_ADMIN}${process.env.API_VERSION_ADMIN ? `/${process.env.API_VERSION_ADMIN}` : ''}`,
    APPS_HOST: `${process.env.APPS_HOST}`,
  }
}

module.exports = nextConfig
