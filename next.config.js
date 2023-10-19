/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_RAPID_API_KEY: "9a2c2c0d12msh72597d1249852d6p1937f7jsn61cede766f6a",
        DB_URI: 'mongodb://localhost:27017/realtor',
        API_URL: 'http://localhost:3000',

        NEXTAUTH_SECRET: 'codingwithwann'
    },
    images: {
        domains: ['bayut-production.s3.eu-central-1.amazonaws.com'],
    }
}

module.exports = nextConfig
