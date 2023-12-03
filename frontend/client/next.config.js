/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: process.env.OUTPUT_PATH
}

module.exports = nextConfig
