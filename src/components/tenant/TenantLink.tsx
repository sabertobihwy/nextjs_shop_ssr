// components/TenantLink.tsx
'use client'

import { useTenant } from '@/redux/hooks/useTenant'
import Link from 'next/link'

/**
 * 
 * @usage <TenantLink href="/account/settings">账号设置</TenantLink>
 * 
 */
export default function TenantLink({
    href,
    ...props
}: React.ComponentProps<typeof Link>) {
    const { tenantName } = useTenant()

    if (!tenantName) return null

    let normalizedHref: typeof href;

    if (typeof href === 'string') {
        // 特判 landing
        if (href === 'landing' || href === '/landing') {
            normalizedHref = `/${tenantName}/`;
        } else {
            normalizedHref = `/${tenantName}${href.startsWith('/') ? href : `/${href}`}`;
        }
    } else {
        normalizedHref = href; // 不处理 URL 对象
    }
    return <Link href={normalizedHref} {...props} />
}
