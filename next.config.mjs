/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.thesportsdb.com" },
      { protocol: "https", hostname: "thesportsdb.com" },
    ],
  },
};

export default nextConfig;
