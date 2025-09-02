import { ThemeOptionsEntity } from "@/types/entities/Theme"
import { assertApiSuccess } from "../http/assert"
// dao -> service -> ssr
// dao -> api -> service -> ssr 
export async function loadThemeOrRedirect(tenantName: string, tenantId: string): Promise<ThemeOptionsEntity> {
    const themeOptsRsp = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/theme?tenantId=${tenantId}`, {
        next: {
            revalidate: 3600
        }
    })
    const themeOpts = (await assertApiSuccess<ThemeOptionsEntity>(themeOptsRsp))!
    return themeOpts
}
