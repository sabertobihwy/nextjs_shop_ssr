import type { NextConfig } from "next";
import path from 'node:path';

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
  turbopack: {
    resolveAlias: {
      '@ss/services': './host-ports/services.js',
    },
  },
  webpack(config, { isServer }) {
    if (isServer) {
      // 让服务端编译器别去找 @ss/services，直接用本地 stub
      config.resolve.alias['@ss/services'] = path.resolve(
        process.cwd(),
        'stubs/ss-services.server.ts'
      );
    } else {
      // 客户端：让浏览器在运行时按 importmap 去加载
      const OUT = new Set(['@ss/services', 'react-dom', 'react-dom/client']);
      config.externals.push(({ request }: any, cb: any) => {
        if (OUT.has(request)) return cb(null, 'module ' + request);
        cb();
      });
    }
    return config;
  },
}

export default nextConfig
