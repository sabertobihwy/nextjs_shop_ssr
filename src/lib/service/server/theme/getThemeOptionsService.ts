import { getThemeOptionsByTenantId } from "@/lib/dao/theme"
import { ThemeOptionsEntity } from "@/types/entities/Theme"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"

export async function getThemeOptionsService(tenantId: string): Promise<ThemeOptionsEntity> {
    const themeOption = await getThemeOptionsByTenantId(tenantId)
    console.log('==== dao theme === themeOption:' + themeOption)

    if (!themeOption) {
        console.log('没有找到themeOPTS')
        throw new BizError(ErrorCode.THEME_NOT_FOUND, 404)
    }
    return {
        tenantId: themeOption.tenant_id,
        themeName: themeOption.theme_name,
        pageInstanceMap: themeOption.page_instance_map as Record<string, string>,
        updatedAt: themeOption.updated_at,
        themeVariant: themeOption.theme_variant,
        version: themeOption.version,
    }
}