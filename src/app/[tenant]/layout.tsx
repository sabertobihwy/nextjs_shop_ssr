// export const runtime = 'nodejs'

import "./globals.css";
import type { ReactNode } from 'react';
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Providers from "@/components/ReduxProvider";
import Script from 'next/script'
import { cookies } from "next/headers";
import { COOKIE_PREFIX } from "@/constants/cookies";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}): Promise<Metadata> {
  const { tenant: tenantName } = await params
  return {
    title: tenantName + " - SHOPSTACK",
    description: "租户个性化商店页面",
    icons: {
      icon: `/${tenantName}/favicon.ico`, // public/nike/favicon.ico 等路径下
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
  const cookieStore = await cookies()
  // 1. redux - userPublic
  const userPublicCookie = cookieStore.get(COOKIE_PREFIX.USER_PUBLIC + tenantName.toLowerCase())?.value
  let userPublic = null
  if (userPublicCookie) {
    try {
      userPublic = JSON.parse(decodeURIComponent(userPublicCookie))
    } catch {
      userPublic = null
    }
  }
  // 2. In Provider, async refresh access_token

  return (
    <html lang="en">
      <head>
        {/* 全局加载 Turnstile 脚本，但 onload callback 由页面控制 */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive" // after client hydration 
        />
      </head>
      <body>
        <Providers tenantName={tenantName} userpublic={userPublic}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
