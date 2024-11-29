/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api_url: "https://car-selling-service-api-kappa.vercel.app/api/v1/",
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
