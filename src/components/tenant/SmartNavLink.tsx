// components/SmartNavLink.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { tenantHref } from '@/lib/utils/tenant'

type Props = {
    tenantName: string
    href: string
    className?: string
    children: ReactNode
    preloadOnHover?: boolean   // 默认 true
    optimisticDot?: boolean    // 默认 true
}

export default function SmartNavLink({
    tenantName, href, className = '',
    children, preloadOnHover = true,
    optimisticDot = true
}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const url = useMemo(() => tenantHref(tenantName, href), [tenantName, href])

    const [visible, setVisible] = useState(false)
    const posRef = useRef({ x: 0, y: 0 })
    const hideTimer = useRef<number | null>(null)

    // 路由变更即关闭
    useEffect(() => { setVisible(false) }, [pathname])

    // 兜底：最长显示 2400ms
    useEffect(() => {
        if (!visible) return
        if (hideTimer.current) window.clearTimeout(hideTimer.current)
        hideTimer.current = window.setTimeout(() => setVisible(false), 2400)
        return () => { if (hideTimer.current) window.clearTimeout(hideTimer.current) }
    }, [visible])

    // 简洁的 Portal（固定定位，不参与布局；只切 visibility）
    const spinnerPortal = typeof document === 'undefined' ? null : createPortal(
        <div
            aria-hidden
            style={{
                position: 'fixed',
                left: 0, top: 0,
                width: 0, height: 0,
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    transform: `translate(${posRef.current.x}px, ${posRef.current.y}px)`,
                    visibility: visible ? 'visible' : 'hidden',
                }}
            >
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
            </div>
        </div>,
        document.body
    )

    return (
        <>
            <Link
                href={url}
                className={className}
                onPointerEnter={preloadOnHover ? () => router.prefetch(url) : undefined}
                onMouseDown={(e) => {
                    if (!optimisticDot) return
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
                    // 在鼠标右下角 10px 处显示
                    posRef.current = { x: e.clientX + 10, y: e.clientY + 10 }
                    setVisible(true)
                }}
            >
                {children}
            </Link>

            {spinnerPortal}
        </>
    )
}
