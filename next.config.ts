/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ik.imagekit.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'microdeft.com' },
    ],
  },

  // 🚀 Disable ESLint errors from blocking build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🚀 Disable TypeScript errors from blocking build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
