/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api_url: "/api/v1/",
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
