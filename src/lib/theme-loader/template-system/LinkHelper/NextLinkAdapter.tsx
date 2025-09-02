// // template-system/NextLinkAdapter.tsx
// import NextLink from "next/link";
// import type { LinkComponent } from "./LinkType";

// export const NextLinkAdapter: LinkComponent = ({ href, children, className, target, rel }) => {
//   const isExternal =
//     typeof href === "string" &&
//     (/^(https?:)?\/\//i.test(href) || /^(mailto:|tel:)/i.test(href));

//   const computedRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

//   // 外链/新窗口：用 <a>
//   if (isExternal || target === "_blank") {
//     return (
//       <a href={href} className={className} target={target} rel={computedRel}>
//         {children}
//       </a>
//     );
//   }

//   // 站内路由：用 <Link>
//   return (
//     <NextLink
//       href={href}
//       className={className}
//       target={target}
//       rel={computedRel}
//       prefetch={false} // 按需：不需要预取可关掉；需要的话删掉这行
//     >
//       {children}
//     </NextLink>
//   );
// };

// template-system/NextLinkAdapter.tsx
// import * as React from "react";
// import NextLink from "next/link";
// import type { LinkComponent } from "./LinkType";

// export const NextLinkAdapter: LinkComponent = ({
//   href,
//   className,
//   target,
//   rel,
//   ariaLabel,
//   overlay,
//   children,
//   ...rest
// }) => {
//   const isExternal =
//     typeof href === "string" &&
//     (/^(https?:)?\/\//i.test(href) || /^(mailto:|tel:)/i.test(href));

//   const _rel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

//   // ------- overlay 覆盖式：外层容器 + 绝对定位锚点 -------
//   if (overlay) {
//     const overlayCls =
//       "absolute inset-0 z-10 rounded-[inherit] focus:outline-none " +
//       "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500";

//     return (
//       <div className={["relative block", className].filter(Boolean).join(" ")}>
//         {children}
//         {isExternal || target === "_blank" ? (
//           <a
//             href={href as string}
//             target={target}
//             rel={_rel}
//             aria-label={ariaLabel}
//             className={overlayCls}
//             {...rest}
//           />
//         ) : (
//           <NextLink
//             href={href as string}
//             target={target}
//             rel={_rel}
//             aria-label={ariaLabel}
//             className={overlayCls}
//             prefetch={true}
//             {...rest}
//           />
//         )}
//       </div>
//     );
//   }

//   // ------- 包裹式：直接用 <a> 或 <NextLink> 包住 children -------
//   const wrapCls = ["block", className].filter(Boolean).join(" ");

//   if (isExternal || target === "_blank") {
//     return (
//       <a
//         href={href as string}
//         target={target}
//         rel={_rel}
//         aria-label={ariaLabel}
//         className={wrapCls}
//         {...rest}
//       >
//         {children}
//       </a>
//     );
//   }

//   return (
//     <NextLink
//       href={href as string}
//       target={target}
//       rel={_rel}
//       aria-label={ariaLabel}
//       className={wrapCls}
//       prefetch={true}
//       {...rest}
//     >
//       {children}
//     </NextLink>
//   );
// };

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Href = string // or UrlObject if你需要

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: Href
  overlay?: boolean
  prefetch?: boolean // 默认 false：大网格不要全预取
}

function isExternalHref(href: Href) {
  return typeof href === 'string' &&
    (/^(https?:)?\/\//i.test(href) || /^(mailto:|tel:)/i.test(href))
}

function areEqual(a: LinkProps, b: LinkProps) {
  return (
    a.href === b.href &&
    a.className === b.className &&
    a.target === b.target &&
    a.rel === b.rel &&
    a['aria-label'] === b['aria-label'] &&
    a.overlay === b.overlay &&
    a.prefetch === b.prefetch
  )
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

const BaseNextLinkAdapter = ({
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

export const NextLinkAdapter = React.memo(BaseNextLinkAdapter, areEqual)
NextLinkAdapter.displayName = 'NextLinkAdapter'
