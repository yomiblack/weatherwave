/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Disable the cache warning
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
  // Enable if using Mantine
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
