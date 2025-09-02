import React from 'react'
import type { ReactNode } from 'react';
import { Metadata } from "next";
import ShopHeaderClient from "./ShopHeaderClient";
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
    description: "shop",
    icons: {
      icon: `/icons/${tenantName}/favicon.ico`, // public/nike/favicon.ico 等路径下
    },
  };
}

export default async function ShopLayout({
  children,
  params
}: Readonly<{
  children: ReactNode,
  params: Promise<{ tenant: string }>
}>) {
  const { tenant: tenantName } = await params
  const cookieStore = await cookies()
  // 1. redux - userSafe
  const userSafeCookie = cookieStore.get(COOKIE_PREFIX.USER_SAFE + tenantName.toLowerCase())?.value
  let userSafe = null
  if (userSafeCookie) {
    try {
      userSafe = JSON.parse(decodeURIComponent(userSafeCookie))
    } catch {
      console.log(`json parse userSafeCookie failed`)
    }
  }

  // 2. In Provider, async refresh access_token

  return (
    <ShopHeaderClient tenantName={tenantName} user={userSafe}>
      {children}
    </ShopHeaderClient>

  );
}
