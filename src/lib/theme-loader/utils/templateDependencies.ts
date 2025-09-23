import { AosOptions } from "aos"

// constants/templateDependencies.ts
type Deps = {
    alpine?: { focus?: boolean } | true
    aos?: Partial<AosOptions> | true
}

/**
 *  set runtime-dependency(like aos) for each template 
 */
export const templateDeps: Record<string, Deps> = {
    pro: {
        alpine: { focus: true },
        aos: { once: true, disable: 'phone', duration: 600, easing: 'ease-out-sine' },
    },
    general: {
        aos: { once: true, disable: 'phone', duration: 600, easing: 'ease-out-sine' },
    },
}
