/** @type {import('next-sitemap').IConfig} */
// Default code you can customize according to your requirements.
module.exports = {
siteUrl: `https://${process.env.MTT_DOMAIN}`,
generateRobotsTxt: true, 
sitemapSize: 7000, 
outDir: `./${process.env.OUTPUT_PATH}`, 
}
