const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? ''

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true
}

module.exports = config
