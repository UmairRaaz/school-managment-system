/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose", // Add this for Mongoose
    serverComponentsExternalPackages: ["mongoose"] // Add this for Mongoose
  },
  
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true // Enable layers experiment
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't.ly',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
};

export default nextConfig;
