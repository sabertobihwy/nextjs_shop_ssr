// export const runtime = 'nodejs'

import "./globals.css";
import type { ReactNode } from 'react';
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Providers from "@/components/ReduxProvider";

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
  console.log('✅ tenant param:', tenantName)
  return (
    <html lang="en">
      <body>
        <Providers tenantName={tenantName}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
