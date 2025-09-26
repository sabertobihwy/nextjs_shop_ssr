import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'duyi-resource.oss-cn-beijing.aliyuncs.com',
      },
      { protocol: 'https', hostname: 'imgs.nestbutter.com' },
      { protocol: 'https', hostname: 'user-imgs.nestbutter.com' }
    ],
  },
  reactStrictMode: false,
  turbopack: {
    // 现在宿主不再静态 import '@ss/services'，这个 turbopack alias 其实可删
    // 留着也无伤大雅，只对 dev 生效
    resolveAlias: {
      '@ss/services': './host-ports/services.js',
    },
  },
  webpack(config) {
    // 统一建个 alias 容器
    config.resolve.alias = { ...(config.resolve.alias || {}) };

    // ✅ 在宿主侧彻底禁用对 '@ss/services' 的解析
    //    —— 如果有人静态 import，它会在构建期直接报错，防止“误用到 SSR/RSC”
    config.resolve.alias['@ss/services$'] = false;

    // ❌ 不要再做任何 externals 了（尤其是 'module ' + request 那套）
    //    - 宿主不需要外部化 react-dom / react-dom/client
    //    - '@ss/services' 也不需要 external，因为你用的是
    //      `import(/* webpackIgnore: true */ <URL字符串变量>)` 直接按 URL 加载

    return config;
  },
}

export default nextConfig
