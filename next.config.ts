import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'duyi-resource.oss-cn-beijing.aliyuncs.com',
      },
      { protocol: 'https', hostname: 'ss-images.pages.dev' }          // 新的 CDN
    ],
  },
  reactStrictMode: false,
}

export default nextConfig
