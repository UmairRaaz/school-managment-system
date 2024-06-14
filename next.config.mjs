/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 't.ly',
          },
        ],
      },
};

export default nextConfig;
