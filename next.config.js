/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

const isStaticExport = process.env.STATIC_EXPORT === '1'

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  ...(isStaticExport ? { output: 'export' } : {}),
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
