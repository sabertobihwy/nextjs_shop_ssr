export const CDN_BASE = 'https://assets.nestbutter.com'
export const CDN_VER = 'v1'
export const CDN_IMAGE = 'https://imgs.nestbutter.com'

export const generateCdn_theme_url = (themeCdnMapValue: string) => {
    return `${CDN_BASE.replace(/\/+$/, '')}/${themeCdnMapValue.replace(/^\/+/, '')}`
}
