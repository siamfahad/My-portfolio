/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 🚀 makes Next.js output static HTML (no SSR)
  distDir: 'out',   // where the static files will be built

  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  images: {
    unoptimized: true, // ✅ needed for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'microdeft.com',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ no blocking on build
  },
}

export default nextConfig
