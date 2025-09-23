import "./globals.css";
import type { ReactNode } from 'react';
import { Metadata } from "next";
// import Script from 'next/script'
import { ThemeOptionsEntity } from "@/types/entities/Theme";
import { RootHeader } from "@/components/RootHeader";
import { loadTenantOrRedirect } from "@/lib/ssr/loadTenantOrRedirect";
import { loadThemeOrRedirect } from "@/lib/ssr/loadThemeOrRedirect";
import { generateCdnUrl, getManifests } from "@/lib/theme-loader/getManifest";
import { buildHeadTags } from "@/lib/theme-loader";
import { CDN_BASE, CDN_VER } from "@/constants/theme";
import Providers from "@/components/provider/ReduxProvider";
import { ReactQueryProvider } from "@/components/provider/ReactQueryProvider";
import { RuntimeBootstrap } from "@/lib/theme-loader/utils/RuntimeBootstrap";
// import { Inter } from 'next/font/google'

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400', '600'], // ⚠️ 减少到常用的两种
//   display: 'swap',
// })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}): Promise<Metadata> {
  const { tenant: tenantName } = await params
  return {
    title: tenantName + " - SceneStack",
    description: "landing",
    icons: {
      icon: `/icons/${tenantName}/favicon.ico`, // public/nike/favicon.ico 等路径下
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: ReactNode,
  params: Promise<{ tenant: string }>
}>) {
  const { tenant: tenantName } = await params
  // include cookie reading-setting & fallback handler 
  const { tenantId } = await loadTenantOrRedirect(tenantName)
  const themeOptions: ThemeOptionsEntity = await loadThemeOrRedirect(tenantName, tenantId)

  // ---
  const themeName = themeOptions.themeName
  const scenes = Object.keys(themeOptions.pageInstanceMap)
  console.log('[scenes:] ' + scenes)
  const current = /* 当前路由对应场景 */      'landing';
  const version = CDN_VER;
  const cdnBase = CDN_BASE;

  const cdnUrl = generateCdnUrl(cdnBase)

  const { vendor, theme: themeCdnMap } = await getManifests(themeName, version, cdnUrl);

  const { importMapJson, links } = buildHeadTags({
    cdnBase,
    cdnUrl,
    themeName,
    vendor,
    theme: themeCdnMap,
    scenes,
    currentScene: current,
    cssFetchPriority: 'high',
    strategy: 'conservative', // 或 'aggressive'
  });


  //---
  return (
    <html lang="en"
      data-theme={themeName}
    >
      <head>
        {/* 全局加载 Turnstile 脚本，但 onload callback 由页面控制 */}
        {/* <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive" // after client hydration 
        /> */}
        {/* Import Map */}
        <script type="importmap-shim"
          dangerouslySetInnerHTML={{ __html: importMapJson }}
        />
        <script async src="https://ga.jspm.io/npm:es-module-shims@2.6.2/dist/es-module-shims.js"></script>
        {links.map((t, i) => {
          if (t.tag === 'link') {
            return (
              <link
                key={i}
                rel={t.rel}
                href={t.href}
                as={(t as any).as}
                crossOrigin={(t as any).crossOrigin}
                fetchPriority={(t as any).fetchPriority}
              />
            );
          }
          if (t.tag === 'meta') {
            return <meta key={i} name={t.name} content={t.content} />;
          }
          return null;
        })}
      </head>
      <body>
        <Providers tenantName={tenantName} tenantId={tenantId} themeOptions={themeOptions} themeCdnMap={themeCdnMap}>
          <RuntimeBootstrap themeName={themeName} />
          <ReactQueryProvider>
            <div className="flex min-h-screen flex-col [--root-header-h:theme(spacing.12)]">
              <RootHeader tenantName={tenantName} sceneList={scenes} themeName={themeName} />
              {children}
            </div>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
