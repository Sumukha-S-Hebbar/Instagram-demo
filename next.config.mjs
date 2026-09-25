/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
};

export default nextConfig;
