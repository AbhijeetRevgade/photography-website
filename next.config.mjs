/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rushibackend.strangled.net",
      },
      {
        protocol: "https",
        hostname: "photographersite-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
