export const CDN_BASE = 'https://theme-system.pages.dev'
export const CDN_VER = 'v1'

export const generateCdn_theme_url = (themeCdnMapValue: string) => {
    return `${CDN_BASE.replace(/\/+$/, '')}/${themeCdnMapValue.replace(/^\/+/, '')}`
}