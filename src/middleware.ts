// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { extractTenantFromPath, isValidTenant } from './lib/utils/tenant';
import { ErrorCode } from './types/shared/error-code';

// 不处理/api
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log('✅=====middlewate=====pathname: ' + pathname)
    const tenantName = extractTenantFromPath(pathname); // 截取最开始的为tenantName

    // ❗静态资源、api，非 tenant 页面直接跳过
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/not-found' || pathname.includes('.'))
    ) {
        return NextResponse.next();
    }

    // to layout.tsx 
    if (!tenantName || !isValidTenant(tenantName)) {
        return NextResponse.redirect(new URL(`/not-found?code=${ErrorCode.TENANT_NOT_FOUND}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|static|favicon.ico|not-found|.*\\..*).*)']
}