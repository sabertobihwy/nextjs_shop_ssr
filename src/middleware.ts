// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { extractTenantFromPath, isValidTenant } from './lib/utils/tenant';
import { ErrorCode } from './types/shared/error-code';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log('✅=====middlewate=====pathname: ' + pathname)
    const tenant = extractTenantFromPath(pathname);

    // ❗静态资源、API 请求、非 tenant 页面直接跳过
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/static')
    ) {
        return NextResponse.next();
    }
    console.log('✅=====middlewate=====tenant: ' + tenant)
    if (!tenant || !isValidTenant(tenant)) {
        return NextResponse.redirect(new URL(`/not-found?code=${ErrorCode.TENANT_NOT_FOUND}`, request.url));
    }

    console.log('✅=====middlewate=====' + "continue...")
    // ✅ 合法租户，放行
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/((?!api|_next|static|favicon.ico|not-found).*)'],
}