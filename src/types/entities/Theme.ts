export interface ThemeOptionsEntity {
    tenantId: string
    themeName: string
    pageInstanceMap: Record<string, string> // sceneName -> pageInstanceId
    updatedAt: Date
    themeVariant?: string | null
    version?: number | null
}