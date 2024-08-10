/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "res.cloudinary.com", "techcrunch.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
