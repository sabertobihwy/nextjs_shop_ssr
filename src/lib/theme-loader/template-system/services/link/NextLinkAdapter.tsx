import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Href = string // or UrlObject if你需要

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: Href
  overlay?: boolean
  prefetch?: boolean // 默认 false：大网格不要全预取
}

export function isExternalHref(href: Href) {
  return typeof href === 'string' &&
    (/^(https?:)?\/\//i.test(href) || /^(mailto:|tel:)/i.test(href))
}

/** 可选：仅在可见或 hover 时预取 */
function useSmartPrefetch(enabled: boolean | undefined, href: Href) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (!enabled || !ref.current || typeof href !== 'string') return
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        router.prefetch(href)
        io.disconnect()
      }
    }, { rootMargin: '400px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [enabled, href, router])

  const onMouseEnter = React.useCallback(() => {
    if (!enabled || typeof href !== 'string') return
    router.prefetch(href)
  }, [enabled, href, router])

  return { containerRef: ref, onMouseEnter }
}

export const NextLinkAdapter = ({
  href,
  className,
  target,
  rel,
  overlay,
  prefetch = false, // 默认不预取，避免大网格“洪水预取”
  children,
  ...rest
}: LinkProps) => {
  const ext = isExternalHref(href)
  const _rel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)

  // 智能预取（可见/悬停）
  const { containerRef, onMouseEnter } = useSmartPrefetch(!ext && prefetch, href)

  if (overlay) {
    const overlayCls =
      'absolute inset-0 z-10 rounded-[inherit] focus:outline-none ' +
      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500'

    return (
      <div ref={containerRef} className={className ? `relative block ${className}` : 'relative block'}>
        {children}
        {ext || target === '_blank' ? (
          <a
            data-kind="plain-a"
            href={href as string}
            target={target}
            rel={_rel}
            aria-label={rest['aria-label']}
            className={overlayCls}
            onMouseEnter={onMouseEnter}
            {...rest}
          >
            {/* Next/link 不能空 children；外链用 <a> 也建议给个隐藏文本 */}
            <span className="sr-only">{rest['aria-label'] || 'Open link'}</span>
          </a>
        ) : (
          <Link
            data-kind="next-link"
            href={href as string}
            target={target}
            rel={_rel}
            aria-label={rest['aria-label']}
            className={overlayCls}
            prefetch={false}           // 这里固定 false，预取由 IO/hover 负责
            onMouseEnter={onMouseEnter}
            {...rest}
          >
            <span className="sr-only">{rest['aria-label'] || 'Open link'}</span>
          </Link>
        )}
      </div>
    )
  }

  const wrapCls = className ? `block ${className}` : 'block'

  if (ext || target === '_blank') {
    return (
      <a
        data-kind="plain-a"
        href={href as string}
        target={target}
        rel={_rel}
        aria-label={rest['aria-label']}
        className={wrapCls}
        onMouseEnter={onMouseEnter}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <div ref={containerRef}>
      <Link
        data-kind="next-link"
        href={href as string}
        target={target}
        rel={_rel}
        aria-label={rest['aria-label']}
        className={wrapCls}
        prefetch={false}         // 交给 useSmartPrefetch
        onMouseEnter={onMouseEnter}
        {...rest}
      >
        {children}
      </Link>
    </div>
  )
}

