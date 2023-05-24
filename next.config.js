/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    PLAIN_TEXT: process.env.PLAIN_TEXT,
  },
};

module.exports = nextConfig;
