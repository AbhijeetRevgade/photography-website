/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rushibackend.strangled.net",
      },
    ],
  },
};

export default nextConfig;
