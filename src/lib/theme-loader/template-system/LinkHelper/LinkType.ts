// template-system/LinkType.ts
export type GenericLinkProps = {
    href: string
    children: React.ReactNode
    className?: string
    target?: string
    rel?: string
    ariaLabel?: string
    /** 为 true 走“覆盖式”；默认 false 走“包裹式” */
    overlay: boolean
}

export type LinkComponent = React.ComponentType<GenericLinkProps>
