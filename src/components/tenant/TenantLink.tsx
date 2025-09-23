// components/TenantLink.tsx
'use client'

import Link from 'next/link'
import { ComponentProps } from 'react';

/**
 * 
 * @usage <TenantLink href="/account/settings">账号设置</TenantLink>
 * 
 */
export function TenantLink({ href, tenantName, ...rest }: { href: string; tenantName: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
    const normalized = href === '/' || href === '/landing'
        ? `/${tenantName}/`
        : `/${tenantName}${href.startsWith('/') ? href : `/${href}`}`
    return <Link href={normalized} {...rest} />
}