/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: '/src',
  // compilerOptions: {
  //   baseUrl: "src/",
  //   paths: {
  //     "@/*": ["./*"]
  //   }
  // }
}

module.exports = nextConfig
